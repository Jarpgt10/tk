<?php

class Area
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function getAllArea(int $activeOnly = 0)
    {
        $WHERE = $activeOnly > 0 ? 'WHERE estado = 1' : '';
        $arr = [];
        $strQuery = "SELECT * FROM area $WHERE;";
        $qTmp = $this->_CONN->db_consulta($strQuery);

        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }

    public function addOrUpdateArea($data)
    {
        if (intval($data['id_area']) > 0) {
            $strQuery = "UPDATE area 
                    SET    estado ={$data['estado']},
                            nombre_area='{$data['nombre_area']}'
                    WHERE id_area = {$data['id_area']};";
        } else {
            $strQuery = "INSERT INTO area(nombre_area) VALUES ('{$data['nombre_area']}')";
        }
        return $this->_CONN->db_consulta($strQuery);
    }
}
