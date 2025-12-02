import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      order: {
        createdAt: 'DESC', // Usuarios más recientes aparecen primero
      },
    });
  }

  async findOne(id: number): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    // Validar que el email no esté duplicado
    if (usuarioData.email) {
      const existente = await this.findByEmail(usuarioData.email);
      if (existente) {
        throw new ConflictException('El email ya está registrado');
      }
    }
    
    const usuario = this.usuarioRepository.create(usuarioData);
    return await this.usuarioRepository.save(usuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  async update(id: number, usuarioData: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuarioData);
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const result = await this.usuarioRepository.delete(id);
    return { deleted: (result.affected ?? 0) > 0 };
  }
}
