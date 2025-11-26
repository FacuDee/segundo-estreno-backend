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
- Host: `bwtdaolzxocsq2kpu9vg-mysql.services.clever-cloud.com`
- Puerto: `3306`

## Comandos de Ejecución

### Para **desarrollo** (base de datos local):
```bash
npm run start:dev
```

### Para **producción** (base de datos Clever Cloud):
```bash
npm run start:prod
```

## Notas Importantes

1. **Sincronización de esquemas:**
   - En **desarrollo**: `synchronize: true` - TypeORM sincroniza automáticamente el esquema
   - En **producción**: `synchronize: false` - Deben ejecutarse migraciones manualmente

2. **Logging:**
   - En **desarrollo**: Activado para ver queries SQL
   - En **producción**: Desactivado para mejor rendimiento

3. **Archivos de entorno:**
   - `.env` → Desarrollo (no se sube a Git)
   - `.env.production` → Producción (no se sube a Git)
   - `.env.example` → Plantilla de ejemplo (sí se sube a Git)

## Credenciales de Clever Cloud

**Host:** bwtdaolzxocsq2kpu9vg-mysql.services.clever-cloud.com  
**Database:** bwtdaolzxocsq2kpu9vg  
**User:** ul9jm5ipwtps9sdu  
**Password:** ZEQjmAFvkoDqFjDtGWCL  
**Port:** 3306  

**Connection URI:**
```
mysql://ul9jm5ipwtps9sdu:ZEQjmAFvkoDqFjDtGWCL@bwtdaolzxocsq2kpu9vg-mysql.services.clever-cloud.com:3306/bwtdaolzxocsq2kpu9vg
```

**MySQL CLI:**
```bash
mysql -h bwtdaolzxocsq2kpu9vg-mysql.services.clever-cloud.com -P 3306 -u ul9jm5ipwtps9sdu -p bwtdaolzxocsq2kpu9vg
```

## Migraciones a Producción

Cuando se necesite actualizar el esquema en producción, se puede usar el script SQL:

```bash
mysql -h bwtdaolzxocsq2kpu9vg-mysql.services.clever-cloud.com -P 3306 -u ul9jm5ipwtps9sdu -p bwtdaolzxocsq2kpu9vg < db/schema_segundo_estreno.sql
```

O conectarse directamente y ejecutar las queries necesarias.
