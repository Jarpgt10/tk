DELIMITER //

CREATE TRIGGER genera_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    DECLARE base_username VARCHAR(50);
    DECLARE generated_username VARCHAR(50);
    DECLARE counter INT DEFAULT 1;

    -- Generar el nombre de usuario base
    SET base_username = LOWER(CONCAT(NEW.primer_nombre, SUBSTRING(NEW.segundo_nombre, 1, 1)));

    -- Iniciar el nombre de usuario generado con el base
    SET generated_username = base_username;

    -- Comprobar si el nombre de usuario generado ya existe
    WHILE EXISTS (SELECT 1 FROM usuario WHERE usuario = generated_username) DO
        -- Si existe, añadir un número al final
        SET generated_username = CONCAT(base_username, counter);
        SET counter = counter + 1;
    END WHILE;

    -- Establecer el nombre de usuario generado en el campo usuario de la nueva fila
    SET NEW.usuario = generated_username;
END //

DELIMITER ;
