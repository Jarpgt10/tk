CREATE TABLE `rol_usuario` (
  `id_rol_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `rol` varchar(20),
  `estado` bit DEFAULT 1,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `rol_configuracion` (
  `id_configuracion` int PRIMARY KEY AUTO_INCREMENT,
  `id_rol_usuario` int,
  `id_menu` int,
  `estado` bit DEFAULT 1,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `id_rol_usuario` int,
  `usuario` varchar(50),
  `contrasena` text,
  `estado` bit DEFAULT 1,
  `primer_nombre` varchar(50),
  `segundo_nombre` varchar(50),
  `primer_apellido` varchar(50),
  `segundo_apellido` varchar(50),
  `id_area` int,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP',
  `url_img` text
);

CREATE TABLE `menu` (
  `id_menu` int PRIMARY KEY AUTO_INCREMENT,
  `menu` varchar(50),
  `estado` bit DEFAULT 1,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `sub_menu` (
  `id_sub_menu` int PRIMARY KEY AUTO_INCREMENT,
  `id_menu` int,
  `sub_menu` varchar(50),
  `estado` bit DEFAULT 1,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `permiso_menu` (
  `id_permiso_menu` int PRIMARY KEY AUTO_INCREMENT,
  `id_menu` int,
  `id_usuario` int,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `area` (
  `id_area` int PRIMARY KEY AUTO_INCREMENT,
  `nombre_area` varchar(50),
  `estado` bit DEFAULT 1,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE `ticket` (
  `id_ticket` int PRIMARY KEY AUTO_INCREMENT,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP',
  `id_usuario_creacion` int,
  `id_usuario_asignado` int,
  `id_usuario_cerrado` int,
  `id_area` int,
  `estado` bit DEFAULT 1,
  `titulo` varchar(50)
);

CREATE TABLE `detalle_ticket` (
  `id_detalle_ticket` int PRIMARY KEY AUTO_INCREMENT,
  `id_ticket` int,
  `fecha_creacion` timestamp DEFAULT 'CURRENT_TIMESTAMP',
  `comentario` text,
  `id_usuario` int
);

ALTER TABLE `rol_configuracion` ADD FOREIGN KEY (`id_rol_usuario`) REFERENCES `rol_usuario` (`id_rol_usuario`);

ALTER TABLE `rol_configuracion` ADD FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_rol_usuario`) REFERENCES `rol_usuario` (`id_rol_usuario`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

ALTER TABLE `sub_menu` ADD FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

ALTER TABLE `permiso_menu` ADD FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

ALTER TABLE `permiso_menu` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`id_usuario_creacion`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`id_usuario_asignado`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`id_usuario_cerrado`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

ALTER TABLE `detalle_ticket` ADD FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id_ticket`);

ALTER TABLE `detalle_ticket` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
