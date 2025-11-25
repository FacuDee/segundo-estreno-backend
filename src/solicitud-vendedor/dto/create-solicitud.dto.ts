import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSolicitudDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
