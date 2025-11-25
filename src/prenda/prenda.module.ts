import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from './prenda.entity';
import { Categoria } from '../categoria/categoria.entity';
import { PrendaService } from './prenda.service';
import { PrendaController } from './prenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda, Categoria])],
  providers: [PrendaService],
  controllers: [PrendaController],
  exports: [PrendaService],
})
export class PrendaModule {}
