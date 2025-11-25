import { IsArray, ArrayNotEmpty, IsInt, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTransaccionDto {
   @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  prendas: number[];

  @IsString()
  metodoPago: string;

  @IsNumber()
  @Type(() => Number)
  total: number;
}
