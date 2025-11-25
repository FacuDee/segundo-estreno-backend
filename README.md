# Backend - Segundo Estreno

API REST desarrollada con NestJS y TypeORM para el proyecto Segundo Estreno.

## ?? Deployment en Render/Vercel

### Variables de Entorno Requeridas

```env
# Database (Clever Cloud MySQL)
DB_HOST=tu-clever-cloud-host.mysql.clever-cloud.com
DB_PORT=3306
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password
DB_NAME=tu-base-de-datos

# JWT Authentication
JWT_SECRET=tu-secreto-super-seguro-aqui

# CORS (Frontend URL)
FRONTEND_URL=https://tu-app-frontend.web.app
```

### Deployment en Render

1. Crear nuevo Web Service en Render
2. Conectar este repositorio
3. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Node
4. Agregar las variables de entorno arriba mencionadas
5. Deploy

### Deployment en Vercel

1. Instalar Vercel CLI: `npm i -g vercel`
2. Ejecutar: `vercel`
3. Configurar las variables de entorno en Vercel Dashboard
4. Deploy: `vercel --prod`

## ?? Estructura del Proyecto

```
src/
+-- auth/              # Autenticación JWT, guards, decorators
+-- carrito/           # Gestión del carrito de compras
+-- categoria/         # Categorías de productos
+-- prenda/            # Gestión de prendas/productos
+-- solicitud-vendedor/ # Solicitudes para ser vendedor
+-- transaccion/       # Transacciones de compra
+-- usuario/           # Gestión de usuarios
+-- app.module.ts      # Módulo raíz
+-- main.ts            # Punto de entrada
db/
+-- schema_segundo_estreno.sql  # Schema MySQL inicial
```

## ??? Desarrollo Local

### Instalación

```bash
npm install
```

### Configuración

Crear archivo `.env` con las variables mencionadas arriba.

### Ejecutar en Desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

### Ejecutar Tests

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

### Build para Producción

```bash
npm run build
npm run start:prod
```

## ?? Endpoints Principales

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Login y obtención de JWT

### Usuarios
- `GET /usuario` - Listar usuarios
- `GET /usuario/:id` - Obtener usuario por ID
- `PUT /usuario/:id` - Actualizar usuario
- `DELETE /usuario/:id` - Eliminar usuario

### Prendas
- `GET /prenda` - Listar todas las prendas
- `GET /prenda/:id` - Obtener prenda por ID
- `POST /prenda` - Crear nueva prenda
- `PUT /prenda/:id` - Actualizar prenda
- `DELETE /prenda/:id` - Eliminar prenda

### Carrito
- `GET /carrito/:usuarioId` - Obtener carrito del usuario
- `POST /carrito` - Agregar prenda al carrito
- `DELETE /carrito/:id` - Eliminar prenda del carrito

### Transacciones
- `GET /transaccion` - Listar transacciones
- `POST /transaccion` - Crear nueva transacción

### Categorías
- `GET /categoria` - Listar categorías
- `POST /categoria` - Crear categoría

## ?? Tecnologías

- **Framework**: NestJS 10
- **ORM**: TypeORM
- **Database**: MySQL
- **Authentication**: JWT, Passport
- **Validation**: class-validator, class-transformer

## ?? Notas de Deployment

- El backend debe estar desplegado antes de deployar el frontend
- Configurar CORS con la URL del frontend en producción
- La base de datos debe estar en Clever Cloud con el schema importado
- Asegurarse de que todas las variables de entorno estén configuradas
- El JWT_SECRET debe ser una cadena segura y única

## ?? Recursos

- [Documentación NestJS](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Render Deployment](https://render.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
