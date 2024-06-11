INSERT INTO rol_usuario(rol) values ('ADMIN'),('USUARIO');


INSERT INTO `ticket`.`area` (`nombre_area`) VALUES ('IT');
INSERT INTO `ticket`.`area` (`nombre_area`) VALUES ('RRHH');

INSERT INTO `ticket`.`menu` (`id_menu`, `menu`) VALUES ('1', 'Home');
INSERT INTO `ticket`.`menu` (`id_menu`, `menu`) VALUES ('2', 'Tickets');
INSERT INTO `ticket`.`menu` (`id_menu`, `menu`) VALUES ('3', 'Mantenimiento');


INSERT INTO `ticket`.`usuario` (`id_rol_usuario`, `usuario`, `contrasena`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `id_area`) VALUES ('1', 'IT', 'b20b0f63ce2ed361e8845d6bf2e59811aaa06ec96bcdb92f9bc0c5a25e83c9a6', 'IT', '', 'Master', '1');
INSERT INTO `ticket`.`permiso_menu` (`id_permiso_menu`, `id_menu`, `id_usuario`) VALUES ('1', '1', '1');
INSERT INTO `ticket`.`permiso_menu` (`id_permiso_menu`, `id_menu`, `id_usuario`) VALUES ('2', '2', '1');
INSERT INTO `ticket`.`permiso_menu` (`id_permiso_menu`, `id_menu`, `id_usuario`) VALUES ('3', '3', '1');


INSERT INTO `ticket`.`sub_menu` (`id_menu`, `sub_menu`) VALUES ('3', 'Usuario');
INSERT INTO `ticket`.`sub_menu` (`id_menu`, `sub_menu`) VALUES ('3', 'Area');
INSERT INTO `ticket`.`sub_menu` (`id_menu`, `sub_menu`) VALUES ('3', 'Roles');

INSERT INTO `ticket`.`rol_configuracion` (`id_rol_usuario`, `id_menu`) VALUES ('1', '1');
INSERT INTO `ticket`.`rol_configuracion` (`id_rol_usuario`, `id_menu`) VALUES ('1', '2');
INSERT INTO `ticket`.`rol_configuracion` (`id_rol_usuario`, `id_menu`) VALUES ('1', '3');

