<?php

class Menu
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function getAllMenu(int $activeOnly = 0)
    {
        $WHERE = $activeOnly > 0 ? 'WHERE estado = 1' : '';
        $arr = [];
        $strQuery = "SELECT * FROM menu $WHERE;";
        $qTmp = $this->_CONN->db_consulta($strQuery);

        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }
}
