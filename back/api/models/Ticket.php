<?php

class Ticket
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function AddOrUpdateTicket($data)
    {
        if (intval($data['id_ticket']) > 0) {
            $strQuery = "UPDATE ticket
            SET     titulo = '{$data['ticket_titulo']}'
            WHERE   id_ticket = {$data['id_ticket']}";
            return $this->_CONN->db_consulta($strQuery);
        } else {
            $strQuery = "INSERT INTO ticket(id_usuario_creacion,titulo)
            VALUES ({$data['id_usuario']},'{$data['ticket_titulo']}')";

            if ($this->_CONN->db_consulta($strQuery)) {
                $strQueryDET = "INSERT INTO detalle_ticket(id_ticket, comentario, id_usuario) VALUES (LAST_INSERT_ID(),'{$data['descripcion']}',{$data['id_usuario']});";
                return $this->_CONN->db_consulta($strQueryDET);
            }
        }
    }

    public function GetAllTicket($activeOnly, $id_usuario)
    {
        $arr = [];
        switch (true) {
            case intval($id_usuario) > 0 && intval($activeOnly) === 1:
                $WHERE = "WHERE A.id_usuario_creacion = {$id_usuario}";
                break;
            case intval($id_usuario) > 0 && intval($activeOnly) === 0:
                $WHERE = "WHERE A.id_usuario_creacion = {$id_usuario} ";
                break;
            case intval($id_usuario) === 0 && intval($activeOnly) > 0:
                $WHERE = "WHERE A.estado = {$activeOnly} ";
                break;

            default:
                $WHERE = '';
                break;
        }

        $id_ticket = 0;
        $strQuery = "SELECT 
                    A.titulo,
                    A.fecha_creacion as fecha_ticket,
                    A.id_ticket,
                    CONCAT_WS(' ', B.primer_nombre, B.segundo_nombre, B.primer_apellido, B.segundo_apellido) AS nombre_completo_creacion,
                    A.titulo,
                    CONCAT_WS(' ', C.primer_nombre, C.segundo_nombre, C.primer_apellido, C.segundo_apellido) AS nombre_completo_cierre,
                    A.estado,
                    CONCAT_WS(' ', D.primer_nombre, D.segundo_nombre, D.primer_apellido, D.segundo_apellido) AS nombre_completo_asignado,
                    A.id_usuario_creacion,
                    A.id_usuario_asignado

                FROM  
                    ticket A
                INNER JOIN usuario B ON A.id_usuario_creacion = B.id_usuario
                LEFT JOIN usuario C ON A.id_usuario_cerrado = C.id_usuario
                LEFT JOIN usuario D ON A.id_usuario_asignado = D.id_usuario
                {$WHERE};";

        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $campo = [];
            $campo['id_usuario_creacion'] = $rTmp->id_usuario_creacion;
            $campo['id_usuario_asignado'] = $rTmp->id_usuario_asignado;
            $campo['estado'] = $rTmp->estado;
            $campo['titulo'] = $rTmp->titulo;
            $campo['fecha_ticket'] = $rTmp->fecha_ticket;
            $id_ticket = $rTmp->id_ticket;
            $campo['id_ticket'] = $rTmp->id_ticket;
            $campo['nombre_completo_creacion'] =
                $rTmp->nombre_completo_creacion;
            $campo['nombre_completo_cierre'] = $rTmp->nombre_completo_cierre;
            $campo['nombre_completo_asignado'] =
                $rTmp->nombre_completo_asignado;
            $campo['detalle_ticket'] = $this->getDetalleTicket($id_ticket);
            $arr[] = $campo;
        }

        return $arr;
    }

    public function getDetalleTicket($id_ticket)
    {
        $arr = [];
        $strQuery = "SELECT 
            A.comentario,
            CONCAT_WS(' ', B.primer_nombre, B.segundo_nombre, B.primer_apellido, B.segundo_apellido) AS nombre_completo,
            A.id_detalle_ticket,
            A.fecha_creacion,
            A.id_usuario
            FROM detalle_ticket  A
            INNER JOIN usuario B on A.id_usuario = B.id_usuario
            WHERE A.id_ticket  ={$id_ticket};";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }

    public function AddTicketComment($data)
    {
        $strQuery = "INSERT INTO detalle_ticket(id_ticket,comentario,id_usuario)
        VALUE({$data['id_ticket']},'{$data['comentario']}',{$data['id_usuario']});";

        return $this->_CONN->db_consulta($strQuery);
    }

    public function finalizeTicket($data)
    {
        if (isset($data['comentario'])) {
            if ($this->AddTicketComment($data)) {
                $strQuery = "UPDATE ticket 
                            SET estado = 0,
                            id_usuario_cerrado ={$data['id_usuario']}
                WHERE id_ticket ={$data['id_ticket']};";
            }
        } else {
            $strQuery = "UPDATE ticket 
                            SET estado = 0,
                            id_usuario_cerrado ={$data['id_usuario']}
                WHERE id_ticket ={$data['id_ticket']};";
        }
        return $this->_CONN->db_consulta($strQuery);
    }

    public function AsignametTicket($data)
    {
        $strQuery = "UPDATE ticket
            SET id_usuario_asignado = {$data['id_usuario_asignado']}
            WHERE id_ticket = {$data['id_ticket']};";
        return $this->_CONN->db_consulta($strQuery);
    }

    public function getTotalTicketByUser($top = 5)
    {
        $arr = [];
        $strQuery = "SELECT 
                    A.id_usuario,
                    A.usuario,
                    count(B.id_ticket) as cantidad_cerrado 
        FROM usuario A
        LEFT JOIN ticket B on A.id_usuario =B.id_usuario_cerrado AND B.estado=0
        WHERE A.id_usuario != 1
        GROUP BY A.id_usuario,A.usuario
        ORDER BY cantidad_cerrado DESC
        LIMIT {$top} ;";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }

    public function getTicketToday()
    {
        $arr = [];
        $date = date('Y-m-d');
        $strQuery = " SELECT A.*,
                        concat_ws(' ',B.primer_nombre,B.segundo_nombre,B.primer_apellido,B.segundo_apellido) as usuario_creacion,
                        concat_ws(' ',C.primer_nombre,C.segundo_nombre,C.primer_apellido,C.segundo_apellido) as usuario_asignado,
                        concat_ws(' ',D.primer_nombre,D.segundo_nombre,D.primer_apellido,D.segundo_apellido) as usuario_cerrado
                    FROM ticket A
                        INNER JOIN usuario B ON A.id_usuario_creacion = B.id_usuario
                        LEFT JOIN usuario C ON A.id_usuario_asignado = C.id_usuario
                        LEFT JOIN usuario D ON A.id_usuario_cerrado = D.id_usuario 
                        WHERE A.fecha_creacion >= '{$date} 00:00:00' AND A.fecha_creacion <= '{$date} 23:59:59'";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }

        return $arr;
    }
}
