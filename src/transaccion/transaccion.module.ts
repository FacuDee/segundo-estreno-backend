import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { Transaccion } from './transaccion.entity';
import { TransaccionPrenda } from './transaccion-prenda.entity';
import { Prenda } from '../prenda/prenda.entity';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaccion, TransaccionPrenda, Prenda, Usuario])
  ],
  providers: [TransaccionService],
  controllers: [TransaccionController]
})
export class TransaccionModule {}
