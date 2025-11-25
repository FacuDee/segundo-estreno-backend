import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
	constructor(private readonly categoriaService: CategoriaService) {}

	@Get()
	async findAll() {
		return await this.categoriaService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return await this.categoriaService.findOne(id);
	}

	@Post()
	async create(@Body() createDto: CreateCategoriaDto) {
		return await this.categoriaService.create(createDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() updateDto: UpdateCategoriaDto) {
		return await this.categoriaService.update(id, updateDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		await this.categoriaService.remove(id);
		return { message: 'Categoria eliminada' };
	}
}
