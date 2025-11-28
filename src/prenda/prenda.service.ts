// src/prenda/prenda.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from './prenda.entity';

@Injectable()
export class PrendaService {
  constructor(
    @InjectRepository(Prenda)
    private readonly prendaRepository: Repository<Prenda>,
  ) {}

  async findAll(): Promise<Prenda[]> {
    return this.prendaRepository.find({ 
      relations: ['categoria'],
      order: { createdAt: 'DESC' } // Más recientes primero
    });
  }

  // Método para admin: obtener todas las prendas con información del vendedor
  async findAllWithVendedor(): Promise<Prenda[]> {
    return this.prendaRepository.find({ 
      relations: ['categoria', 'vendedor'],
      order: { createdAt: 'DESC' }
    });
  }

  // Método para obtener una prenda por su ID con información de categoría y vendedor
  async findOne(id: number): Promise<Prenda | null> {
    return this.prendaRepository.findOne({ 
      where: { id }, 
      relations: ['categoria', 'vendedor'] 
    });
  }

  // Método para obtener prendas por usuario (vendedor)
  async findByUser(userId: number): Promise<Prenda[]> {
    const prendas = await this.prendaRepository.find({ 
      where: { vendedor: { id: userId } }, 
      relations: ['categoria', 'vendedor'],
      order: { createdAt: 'DESC' } // Más recientes primero
    });
    
    return prendas;
  }

  // Método para crear una nueva prenda
  async create(createPrendaDto: any) {
    // Crear la prenda con los datos del DTO y el vendedor_id
    const prenda = this.prendaRepository.create({
      titulo: createPrendaDto.titulo,
      descripcion: createPrendaDto.descripcion,
      talle: createPrendaDto.talle,
      precio: createPrendaDto.precio,
      imagen_url: createPrendaDto.imagen_url,
      disponible: createPrendaDto.disponible ?? true,
      categoria: { id: createPrendaDto.categoria },
      vendedor: { id: createPrendaDto.vendedor_id },
    });
    
    // Guardar la prenda en la base de datos
    const savedPrenda = await this.prendaRepository.save(prenda);
    return savedPrenda;
  }

  // Método para actualizar una prenda
  async update(id: string, updatePrendaDto: CreatePrendaDto) {
    const prendaId = Number(id);
    const prenda = await this.prendaRepository.findOne({ 
      where: { id: prendaId }, 
      relations: ['vendedor', 'categoria'] 
    });
    if (!prenda) {
      throw new Error(`Prenda con ID ${id} no encontrada.`);
    }
    
    // Preparar datos de actualización preservando el vendedor original
    const updateData = {
      titulo: updatePrendaDto.titulo,
      descripcion: updatePrendaDto.descripcion,
      talle: updatePrendaDto.talle,
      precio: updatePrendaDto.precio,
      imagen_url: updatePrendaDto.imagen_url,
      disponible: updatePrendaDto.disponible ?? true,
      categoria: { id: updatePrendaDto.categoria },
      ...(updatePrendaDto.vendedor && { vendedor: { id: updatePrendaDto.vendedor } })
    };
    
    await this.prendaRepository.update(prendaId, updateData);
    return await this.prendaRepository.findOne({ where: { id: prendaId }, relations: ['categoria', 'vendedor'] });
  }

  // Método para admin actualizar cualquier prenda preservando el vendedor original
  async adminUpdate(id: string, updatePrendaDto: CreatePrendaDto) {
    const prendaId = Number(id);
    const prenda = await this.prendaRepository.findOne({ 
      where: { id: prendaId }, 
      relations: ['vendedor', 'categoria'] 
    });
    
    if (!prenda) {
      throw new Error(`Prenda con ID ${id} no encontrada.`);
    }

    // Preservar el vendedor original
    await this.prendaRepository.update(prendaId, {
      titulo: updatePrendaDto.titulo,
      descripcion: updatePrendaDto.descripcion,
      talle: updatePrendaDto.talle,
      precio: updatePrendaDto.precio,
      imagen_url: updatePrendaDto.imagen_url,
      disponible: updatePrendaDto.disponible ?? true,
      categoria: { id: updatePrendaDto.categoria },
      // Mantener el vendedor original, no actualizarlo
      vendedor: { id: prenda.vendedor.id },
    });
    
    // Retornar la prenda actualizada con relaciones
    return await this.prendaRepository.findOne({ 
      where: { id: prendaId }, 
      relations: ['categoria', 'vendedor'] 
    });
  }

  // Método para eliminar una prenda
  async remove(id: string) {
    const prendaId = Number(id);
    const result = await this.prendaRepository.delete(prendaId);
    if (result.affected && result.affected > 0) {
      return { mensaje: `Prenda con ID ${id} eliminada.` };
    } else {
      return { mensaje: `Prenda con ID ${id} no encontrada o ya eliminada.` };
    }
  }
}
