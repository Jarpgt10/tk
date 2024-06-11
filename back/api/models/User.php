<?php

class User
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function getAllUser($activeOnly)
    {
        $WHERE = $activeOnly > 0 ? 'WHERE A.estado = 1' : '';
        $arr = [];
        $strQuery = "SELECT 
                            A.id_usuario,
                            A.usuario,
                            CONCAT_WS(
                            ' ',
                            A.primer_nombre,
                            A.segundo_nombre,
                            A.primer_apellido,
                            A.segundo_apellido
                            ) AS nombre_completo,
                            A.primer_nombre,
                            A.segundo_nombre,
                            A.primer_apellido,
                            A.segundo_apellido,
                            A.id_rol_usuario,
                            A.estado,
                            B.rol,
                            C.nombre_area,
                            C.id_area
                    FROM usuario A 
                    INNER JOIN rol_usuario B on A.id_rol_usuario = B.id_rol_usuario
                    INNER JOIN area C on A.id_area = C.id_area;
                    {$WHERE}; ";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $result = [];
            $id_equipo_asignado = $rTmp->id_equipo_asignado;
            $id_usuario = $rTmp->id_usuario;
            $result['primer_nombre'] = $rTmp->primer_nombre;
            $result['segundo_nombre'] = $rTmp->segundo_nombre;
            $result['primer_apellido'] = $rTmp->primer_apellido;
            $result['segundo_apellido'] = $rTmp->segundo_apellido;
            $result['id_rol_usuario'] = $rTmp->id_rol_usuario;
            $result['id_usuario'] = $rTmp->id_usuario;
            $result['usuario'] = $rTmp->usuario;
            $result['nombre_completo'] = $rTmp->nombre_completo;
            $result['estado'] = $rTmp->estado;
            $result['nombre_area'] = $rTmp->nombre_area;
            $result['id_equipo_asignado'] = $rTmp->id_equipo_asignado;
            $result['cant_equipo'] = $rTmp->cant_equipo;
            $result['id_area'] = $rTmp->id_area;
            $result['rol'] = $rTmp->rol;

            $result['permisos'] = $this->getPermissionByUserId($id_usuario);
            $arr[] = $result;
        }

        return $arr;
    }

    public function getPermissionByUserId(int $id_usuario = 0)
    {
        $WHERE = $id_usuario > 0 ? "WHERE A.id_usuario = $id_usuario" : '';
        $arr = [];
        $strQuery = "SELECT A.id_permiso_menu, A.id_menu, B.menu
            FROM permiso_menu A
            INNER JOIN menu B ON A.id_menu = B.id_menu AND B.estado = 1
             $WHERE;";
        $qTmp = $this->_CONN->db_consulta($strQuery);

        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $result = [];
            $id_menu = $rTmp->id_menu;
            $result['id_permiso_menu'] = $rTmp->id_permiso_menu;
            $result['id_menu'] = $rTmp->id_menu;
            $result['menu'] = $rTmp->menu;
            $arr[] = $result;
        }

        return $arr;
    }

    public function addOrUpdateUser($data)
    {
        $data = $this->FormData($data);

        $_VALUES_CONFIG = [];
        $_CONFIG = json_decode($data['configuracion']);

        foreach ($_CONFIG as $config) {
            $id_menu = $config->id_menu;
            $VALUES[] = "($id_menu,{$data['id_usuario']})";
        }
        $_VALUES_CONFIG = implode(',', $VALUES);

        $strPermisos = "INSERT INTO permiso_menu(id_menu,id_usuario)VALUES  $_VALUES_CONFIG";
        if (intval($data['id_usuario']) > 0) {
            $strQuery = "UPDATE usuario
                        SET
                        id_area ={$data['id_area']},
                        id_rol_usuario = {$data['id_rol_usuario']},
                        primer_apellido = {$data['primer_apellido']},
                        primer_nombre = {$data['primer_nombre']},
                        segundo_apellido = {$data['segundo_apellido']},
                        segundo_nombre = {$data['segundo_nombre']}
            WHERE id_usuario = {$data['id_usuario']};";
            if ($this->_CONN->db_consulta($strQuery)) {
                $strCleanPermisos = "DELETE FROM permiso_menu where id_usuario= {$data['id_usuario']}";
                if ($this->_CONN->db_consulta($strCleanPermisos)) {
                    return $this->_CONN->db_consulta($strPermisos);
                }
            }
        } else {
            $strQuery = "INSERT INTO usuario(
                                id_rol_usuario,
                                primer_nombre,
                                segundo_nombre,
                                primer_apellido,
                                segundo_apellido,
                                id_area,
                                contrasena)
                    VALUES  ({$data['id_rol_usuario']},
                           {$data['primer_nombre']},
                            {$data['segundo_nombre']},
                            {$data['primer_apellido']},
                            {$data['segundo_apellido']},
                            {$data['id_area']},
                            {$data['contrasena']});";
            // var_dump($strQuery);

            if ($this->_CONN->db_consulta($strQuery)) {
                $strQueryLastId =
                    'SELECT id_usuario FROM usuario WHERE estado = 1 ORDER BY id_usuario DESC LIMIT 1;';
                $qTmp = $this->_CONN->db_consulta($strQueryLastId);
                $id_usuario = null;
                while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
                    $id_usuario = $rTmp->id_usuario;
                }

                foreach ($_CONFIG as $config) {
                    $id_menu = $config->id_menu;
                    $VALUES[] = "($id_menu,$id_usuario)";
                }
                $_VALUES_CONFIG = implode(',', $VALUES);
                $strPermisos = "INSERT INTO permiso_menu(id_menu,id_usuario)VALUES $_VALUES_CONFIG  ";
                return $this->_CONN->db_consulta($strPermisos);
            }
        }
    }

    private function FormData($data)
    {
        $data['primer_apellido'] = $this->validateField(
            $data['primer_apellido']
        );
        $data['primer_nombre'] = $this->validateField($data['primer_nombre']);
        $data['segundo_apellido'] = $this->validateField(
            $data['segundo_apellido']
        );
        $data['segundo_nombre'] = $this->validateField($data['segundo_nombre']);
        $data['contrasena'] = $this->validateField($data['contrasena']);

        return $data;
    }

    private function validateField($value)
    {
        return isset($value) && !empty($value) ? "'$value'" : 'NULL';
    }
}
