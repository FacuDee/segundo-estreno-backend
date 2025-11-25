import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOneBy({ id });
  }

  async create(createDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createDto);
    return await this.categoriaRepository.save(categoria);
  }

  async update(
    id: number,
    updateDto: UpdateCategoriaDto,
  ): Promise<Categoria | null> {
    await this.categoriaRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
