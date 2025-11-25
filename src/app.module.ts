import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrendaModule } from './prenda/prenda.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CarritoModule } from './carrito/carrito.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SolicitudVendedorModule } from './solicitud-vendedor/solicitud-vendedor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      charset: 'utf8mb4_unicode_ci',
      logging: true,
    }),
    UsuarioModule,
    PrendaModule,
    CategoriaModule,
    CarritoModule,
    TransaccionModule,
    AuthModule,
    SolicitudVendedorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
