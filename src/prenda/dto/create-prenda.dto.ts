import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePrendaDto {
  @IsString()
  titulo: string;

  @IsNumber()
  precio: number;

  @IsString()
  descripcion: string;

  @IsString()
  talle: string;

  @IsString()
  @IsOptional()
  imagen_url?: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsNumber()
  categoria: number; // ID de la categoría

  @IsNumber()
  vendedor: number; // id del usuario vendedor
}