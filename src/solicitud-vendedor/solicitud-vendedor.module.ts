import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudVendedor } from './solicitud-vendedor.entity';
import { SolicitudVendedorController } from './solicitud-vendedor.controller';
import { SolicitudVendedorService } from './solicitud-vendedor.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudVendedor]), forwardRef(() => UsuarioModule)],
  controllers: [SolicitudVendedorController],
  providers: [SolicitudVendedorService],
  exports: [SolicitudVendedorService]
})
export class SolicitudVendedorModule {}
