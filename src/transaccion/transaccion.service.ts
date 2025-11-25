import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Transaccion } from './transaccion.entity';
import { TransaccionPrenda } from './transaccion-prenda.entity';
import { Prenda } from '../prenda/prenda.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';

@Injectable()
export class TransaccionService {
	constructor(
		@InjectRepository(Transaccion)
		private transaccionRepo: Repository<Transaccion>,
		@InjectRepository(TransaccionPrenda)
		private transaccionPrendaRepo: Repository<TransaccionPrenda>,
		@InjectRepository(Prenda)
		private prendaRepo: Repository<Prenda>,
		@InjectRepository(Usuario)
		private usuarioRepo: Repository<Usuario>,
	) {}

	async createTransaccion(dto: CreateTransaccionDto, usuarioId: number) {
		console.log('createTransaccion DTO:', dto, 'usuarioId:', usuarioId);
		// Verificar usuario
		const usuario = await this.usuarioRepo.findOne({ where: { id: usuarioId } });
		if (!usuario) throw new BadRequestException('Usuario no encontrado');

		// Verificar prendas y stock (carga relacionando prenda con vendedor)
		const prendas = await this.prendaRepo.find({ where: { id: In(dto.prendas) }, relations: ['vendedor'] });
		if (prendas.length !== dto.prendas.length) throw new BadRequestException('Alguna prenda no existe');
		for (const prenda of prendas) {
			if (!prenda.disponible) throw new BadRequestException(`Prenda ${prenda.id} no disponible`);
			// comprobación robusta del id del vendedor
			const vendedorId = prenda.vendedor?.id ?? (prenda as any).vendedorId ?? null;
			console.log(`prenda ${prenda.id} vendedorId:`, vendedorId, 'usuarioId:', usuarioId);

			if (vendedorId !== null && Number(vendedorId) === Number(usuarioId)) {
				throw new BadRequestException('No puedes comprar tu propia prenda');
			}
		}


		// Crear transacción
		const transaccion = this.transaccionRepo.create({
			usuario,
			total: dto.total,
			fecha: new Date(),
			metodoPago: dto.metodoPago,
		});
		await this.transaccionRepo.save(transaccion);

		// Asociar prendas y actualizar stock
		for (const prenda of prendas) {
			const tp = this.transaccionPrendaRepo.create({
				idTransaccion: transaccion.id,
				idPrenda: prenda.id,
				precioVendido: prenda.precio,
			});
			await this.transaccionPrendaRepo.save(tp);
			prenda.disponible = false;
			await this.prendaRepo.save(prenda);
		}

		return { transaccionId: transaccion.id, prendas: prendas.map(p => p.id), total: dto.total, fecha: transaccion.fecha };
	}
	// Compras del usuario
	async getComprasUsuario(userId: number) {
		const transacciones = await this.transaccionRepo.find({
			where: { usuario: { id: userId } },
			relations: ['usuario'],
		});
		// Para cada transacción, obtener las prendas asociadas
		const result: any[] = [];
		for (const transaccion of transacciones) {
			const prendasTransaccion = await this.transaccionPrendaRepo.find({
				where: { idTransaccion: transaccion.id },
				relations: ['prenda'],
			});
			result.push({
				id: transaccion.id,
				fecha: transaccion.fecha,
				total: transaccion.total,
				metodoPago: transaccion.metodoPago,
				prendas: prendasTransaccion.map(pt => pt.prenda),
			});
		}
		return result;
	}

	// Ventas del usuario (como vendedor)
	async getVentasUsuario(userId: number) {
		// Buscar prendas donde el vendedor es el usuario
		const transacciones = await this.transaccionRepo.find({ relations: ['usuario'] });
		const result: any[] = [];
		for (const transaccion of transacciones) {
			const prendasVendidas = await this.transaccionPrendaRepo.find({
				where: { idTransaccion: transaccion.id },
				relations: ['prenda', 'prenda.vendedor'],
			});
			for (const tp of prendasVendidas) {
				const prenda = tp.prenda;
				if (prenda.vendedor && Number(prenda.vendedor.id) === Number(userId)) {
					result.push({
						id: transaccion.id,
						fecha: transaccion.fecha,
						total: tp.precioVendido,
						metodoPago: transaccion.metodoPago,
						comprador: transaccion.usuario?.username || 'N/A',
						prendas: [prenda],
					});
				}
			}
		}
		return result;
	}
}
