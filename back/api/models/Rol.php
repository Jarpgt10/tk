<?php

class Rol
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function getAllRol(int $activeOnly = 0)
    {
        $WHERE = $activeOnly > 0 ? 'WHERE estado = 1' : '';
        $arr = [];
        $strQuery = "SELECT * FROM rol_usuario $WHERE;";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $temp = [];
            $temp['id_rol_usuario'] = $rTmp->id_rol_usuario;
            $id_rol_usuario = $rTmp->id_rol_usuario;
            $temp['rol'] = $rTmp->rol;
            $temp['estado'] = $rTmp->estado;
            $temp['configuracion'] = $this->getConfiguracionByRol(
                $id_rol_usuario
            );
            $arr[] = $temp;
        }

        return $arr;
    }

    public function getConfiguracionByRol(int $id_rol_usuario = 0)
    {
        $arr = [];
        $strQuery = "SELECT * FROM rol_configuracion WHERE id_rol_usuario =$id_rol_usuario ;";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }

    public function addOrUpdateRol($data)
    {
        $data = $this->FormData($data);
        $VALUES = [];
        $arr_ids_menu = json_decode($data['ids_menus']);
        foreach ($arr_ids_menu as $id_menu) {
            $VALUES[] = "($id_menu,{$data['id_rol_usuario']})";
        }
        $VALUES = implode(',', $VALUES);
        if (intval($data['id_rol_usuario']) > 0) {
            $strQuery = "   UPDATE rol_usuario
                            SET estado = {$data['estado']},
                                rol={$data['rol']}
                            WHERE id_rol_usuario={$data['id_rol_usuario']};";
            if ($this->_CONN->db_consulta($strQuery)) {
                $strQuery = "DELETE FROM rol_configuracion WHERE id_rol_usuario={$data['id_rol_usuario']};";
                if ($this->_CONN->db_consulta($strQuery)) {
                    $strQuery = "INSERT INTO rol_configuracion(id_menu,id_rol_usuario)VALUES {$VALUES};";
                    return $this->_CONN->db_consulta($strQuery);
                }
            }
        } else {
            $strQuery = "INSERT INTO rol_usuario(rol) VALUES ({$data['rol']});";
            if ($this->_CONN->db_consulta($strQuery)) {
                $strQuery = "INSERT INTO rol_configuracion(id_menu,id_rol_usuario)VALUES {$VALUES};";
                return $this->_CONN->db_consulta($strQuery);
            }
        }
    }

    private function FormData($data)
    {
        $data['rol'] = $this->validateField($data['rol']);

        return $data;
    }

    private function validateField($value)
    {
        return isset($value) && !empty($value) ? "'$value'" : 'NULL';
    }
}
