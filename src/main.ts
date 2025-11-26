import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://segundo-estreno.web.app',
      'https://segundo-estreno.firebaseapp.com',
      process.env.FRONTEND_URL || '*'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Solo servir archivos estáticos si no es Vercel
  if (process.env.VERCEL !== '1') {
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
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
