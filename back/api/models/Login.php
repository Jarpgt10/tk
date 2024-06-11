<?php

class Login
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function Login($data)
    {
        $id_usuario = 0;
        $res = [];
        $strQuery = "SELECT * FROM usuario WHERE usuario = '{$data['usuario']}' and contrasena = '{$data['contrasena']}' LIMIT 1;";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $id_usuario = $rTmp->id_usuario;
            $res[] = $rTmp;
        }

        return $id_usuario;
    }

    public function getUserById(int $id_usuario)
    {
        $arr = [];
        $strQuery = "SELECT id_usuario, id_rol_usuario, usuario, estado, fecha_creacion ,id_area,url_img
                FROM usuario WHERE id_usuario = $id_usuario LIMIT 1;";

        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr['id_usuario'] = $rTmp->id_usuario;
            $arr['usuario'] = $rTmp->usuario;
            $arr['id_area'] = $rTmp->id_area;
            $arr['url_img'] = $rTmp->url_img;

            $arr['permisos'] = $this->getPermissionByUserId($id_usuario);
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
            $result['sub_menu'] = $this->getSubMenu($id_menu);

            $arr[] = $result;
        }

        return $arr;
    }

    public function getSubMenu(int $id_menu)
    {
        $WHERE = $id_usuario > 0 ? "WHERE id_menu = $id_menu" : '';
        $arr = [];
        $strQuery = "SELECT * FROM sub_menu
             $WHERE;";
        $qTmp = $this->_CONN->db_consulta($strQuery);

        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $result = [];

            $id_menu = $rTmp->id_menu;
            $result['id_sub_menu'] = $rTmp->id_sub_menu;
            $result['id_menu'] = $rTmp->id_menu;
            $result['sub_menu'] = $rTmp->sub_menu;

            $arr[] = $result;
        }
        return $arr;
    }
}
