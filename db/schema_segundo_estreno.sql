-- archivo: schema_segundo_estreno.sql
-- Esquema para "Segundo Estreno" (MySQL / InnoDB, utf8mb4)

SET @OLD_FK_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `segundo_estreno`;
CREATE DATABASE `segundo_estreno` CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_unicode_ci';
USE `segundo_estreno`;

-- Tabla usuarios
CREATE TABLE `usuarios` (
  `id_usuario` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(200) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('comprador','vendedor','admin') NOT NULL DEFAULT 'comprador',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla categorias
CREATE TABLE `categorias` (
  `id_categoria` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla transacciones (cada transacción pertenece a un comprador = usuario)
CREATE TABLE `transacciones` (
  `id_transaccion` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL, -- comprador
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  `metodo_pago` VARCHAR(100),
  `estado` ENUM('pendiente','completada','cancelada') NOT NULL DEFAULT 'completada',
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla prendas
CREATE TABLE `prendas` (
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

-- Tabla intermedia Transaccion <-> Prenda
-- Guarda el precio al momento de la venta (snapshot) y asocia prendas a una transacción.
CREATE TABLE `transaccion_prenda` (
  `id_transaccion` INT NOT NULL,
  `id_prenda` INT NOT NULL,
  `precio_vendido` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_transaccion`, `id_prenda`),
  FOREIGN KEY (`id_transaccion`) REFERENCES `transacciones`(`id_transaccion`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_prenda`) REFERENCES `prendas`(`id_prenda`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Nueva tabla: solicitudes de convertirse en vendedor
CREATE TABLE `solicitudes_vendedor` (
  `id_solicitud` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `status` ENUM('pendiente','aceptada','rechazada') NOT NULL DEFAULT 'pendiente',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`usuario_id`),
  INDEX (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS=@OLD_FK_CHECKS;
