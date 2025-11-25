import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Servir archivos estáticos del frontend build (ajustar la ruta si es necesario)
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend-2', 'public'));

  // Fallback: para cualquier ruta que NO sea API, servir index.html
  app.use((req, res, next) => {
    // Si la ruta parece de API, pasar al backend
    if (
      req.url.startsWith('/api') ||
      req.url.startsWith('/auth') ||
      req.url.startsWith('/prenda') ||
      req.url.startsWith('/carrito') ||
      req.url.startsWith('/usuario') ||
      req.url.startsWith('/categoria') ||
      req.url.startsWith('/transaccion') ||
      req.url.startsWith('/solicitud-vendedor')
    ) {
      return next();
    }
    // Si no es API, servir el frontend
    res.sendFile(join(__dirname, '..', '..', 'frontend-2', 'public', 'index.html'));
  });
      // Permitir rutas de solicitud-vendedor pasar al backend
      app.use((req, res, next) => {
        if (
          req.url === '/solicitud-vendedor' ||
          req.url.startsWith('/solicitud-vendedor/')
        ) {
          return next();
        }
        next();
      });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
