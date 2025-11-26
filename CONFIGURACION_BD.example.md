# Configuración de Base de Datos - Segundo Estreno Backend

Este proyecto está configurado para usar **dos bases de datos** según el entorno:

## Configuración

### **Desarrollo (Local)**
- Archivo: `.env`
- Base de datos: MySQL local
- Host: `localhost`
- Puerto: `3306`

### **Producción (Clever Cloud)**
- Archivo: `.env.production`
- Base de datos: MySQL en Clever Cloud
- Host: `tu-host.mysql.services.clever-cloud.com`
- Puerto: `3306`

## Comandos de Ejecución

### Para **desarrollo** (base de datos local):
```bash
npm run start:dev
```

### Para **producción** (base de datos Clever Cloud):
```bash
$env:NODE_ENV="production"; npm run start:dev
```

## Notas Importantes

1. **Sincronización de esquemas:**
   - Ambos entornos: `synchronize: false` - Para proteger datos existentes
   - Usa los scripts SQL en `/db` para crear/actualizar el esquema

2. **Logging:**
   - En **desarrollo**: Activado para ver queries SQL
   - En **producción**: Desactivado para mejor rendimiento

3. **Archivos de entorno:**
   - `.env` → Desarrollo (no se sube a Git)
   - `.env.production` → Producción (no se sube a Git)
   - `.env.example` → Plantilla de ejemplo (sí se sube a Git)

## Configuración de Credenciales

**IMPORTANTE:** Crea un archivo `CONFIGURACION_BD.md` (no incluido en Git) con tus credenciales reales.

### Ejemplo de estructura:

**Host:** tu-host.mysql.services.clever-cloud.com  
**Database:** tu_database_name  
**User:** tu_usuario  
**Password:** tu_password  
**Port:** 3306  

## Migraciones a Producción

Para crear las tablas en Clever Cloud:

1. Accede a phpMyAdmin desde el panel de Clever Cloud
2. Ejecuta el script: `db/schema_clever_cloud.sql`

## Crear Usuario Admin

Ejecuta el script para generar el SQL de inserción:

```bash
node scripts/create-admin.js
```

Luego copia y pega el resultado en phpMyAdmin.
