import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudVendedor } from './solicitud-vendedor.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SolicitudVendedorService {
    constructor(
    @InjectRepository(SolicitudVendedor)
    private repo: Repository<SolicitudVendedor>,
    private readonly usuarioService: UsuarioService,
  ) {}

  create(data: { userId: number; username: string }) {
  const solicitud = this.repo.create({ ...data });
  return this.repo.save(solicitud);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async updateStatus(id: number, status: 'aceptada' | 'rechazada') {
    const s = await this.findOne(id);
    if (!s) return null;
    s.status = status;
    const saved = await this.repo.save(s);

    // Si la solicitud fue aceptada, actualizar el rol del usuario correspondiente
    if (status === 'aceptada') {
      try {
        await this.usuarioService.update(s.userId, { rol: 'vendedor' });
      } catch (err) {
        // registrar error pero no revertir la actualización de la solicitud
        console.error('Error al actualizar rol de usuario tras aceptar solicitud:', err);
      }
    }

    return saved;
  }
}
