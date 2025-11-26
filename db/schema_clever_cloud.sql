-- Script para ejecutar en Clever Cloud MySQL
-- Este script solo crea las tablas, NO crea/elimina la base de datos

USE `bwtdaolzxocsq2kpu9vg`;

SET @OLD_FK_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(200) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('comprador','vendedor','admin') NOT NULL DEFAULT 'comprador',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla transacciones (cada transacción pertenece a un comprador = usuario)
CREATE TABLE IF NOT EXISTS `transacciones` (
  `id_transaccion` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL, -- comprador
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  `metodo_pago` VARCHAR(100),
  `estado` ENUM('pendiente','completada','cancelada') NOT NULL DEFAULT 'completada',
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla prendas
CREATE TABLE IF NOT EXISTS `prendas` (
  `id_prenda` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT,
  `talle` VARCHAR(50) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `imagen_url` VARCHAR(500),
  `disponible` TINYINT(1) NOT NULL DEFAULT 1,
  `vendedor_id` INT,        -- FK a usuarios (vendedor). nullable para conservar el registro si borran el usuario
  `categoria_id` INT,       -- FK a categorias
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`vendedor_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id_categoria`) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX (`vendedor_id`),
  INDEX (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla carritos (uno a uno con usuario: enforced por UNIQUE usuario_id)
CREATE TABLE IF NOT EXISTS `carritos` (
  `id_carrito` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla intermedia Carrito <-> Prenda (muchos a muchos: una prenda puede estar en varios carritos hasta que se venda)
CREATE TABLE IF NOT EXISTS `carrito_prenda` (
  `id_carrito` INT NOT NULL,
  `id_prenda` INT NOT NULL,
  `added_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_carrito`, `id_prenda`),
  FOREIGN KEY (`id_carrito`) REFERENCES `carritos`(`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_prenda`) REFERENCES `prendas`(`id_prenda`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla intermedia Transaccion <-> Prenda
-- Guarda el precio al momento de la venta (snapshot) y asocia prendas a una transacción.
CREATE TABLE IF NOT EXISTS `transaccion_prenda` (
  `id_transaccion` INT NOT NULL,
  `id_prenda` INT NOT NULL,
  `precio_vendido` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_transaccion`, `id_prenda`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `transacciones`(`id_transaccion`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_prenda`) REFERENCES `prendas`(`id_prenda`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Nueva tabla: solicitudes de convertirse en vendedor
CREATE TABLE IF NOT EXISTS `solicitudes_vendedor` (
  `id_solicitud` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `status` ENUM('pendiente','aceptada','rechazada') NOT NULL DEFAULT 'pendiente',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`usuario_id`),
  INDEX (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar categorías iniciales
INSERT IGNORE INTO `categorias` (`nombre`) VALUES 
  ('Accesorios'),
  ('Botas'),
  ('Botines'),
  ('Buzos'),
  ('Camisas'),
  ('Camperas'),
  ('Carteras'),
  ('Faldas'),
  ('Gorras'),
  ('Jeans'),
  ('Pantalones'),
  ('Remeras'),
  ('Sandalias'),
  ('Shorts'),
  ('Sombreros'),
  ('Vestidos'),
  ('Zapatillas'),
  ('Zapatos');

SET FOREIGN_KEY_CHECKS=@OLD_FK_CHECKS;
