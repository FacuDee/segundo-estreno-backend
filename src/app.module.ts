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
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        charset: 'utf8mb4_unicode_ci',
        logging: configService.get<string>('NODE_ENV') === 'development',
        // Configuración optimizada para Vercel Serverless
        extra: {
          connectionLimit: 1, // Limitar a 1 conexión por función serverless
          connectTimeout: 60000, // 60 segundos
          acquireTimeout: 60000,
          timeout: 60000,
        },
        keepConnectionAlive: false, // No mantener conexiones entre invocaciones
        retryAttempts: 3,
        retryDelay: 3000,
      }),
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
