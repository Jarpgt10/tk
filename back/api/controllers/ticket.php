<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Ticket.php';

getHeader();

$conn = new Mysql();
$_model = new Ticket($conn);

$activeOnly = $_GET['activeonly'] == 'true' ? 1 : 0;
$id_usuario = isset($_GET['id_usuario']) ? intval($_GET['id_usuario']) : 0;
$top = isset($_GET['top']) ? intval($_GET['top']) : 0;

if (isset($_GET['add-or-update-ticket'])) {
    if ($_model->AddOrUpdateTicket($_POST)) {
        $res = [
            'err' => false,
            'message' => 'Realizado con exito!',
        ];
    } else {
        $res = [
            'err' => true,
            'message' => 'Error al realizar el proceso!',
        ];
    }
}

if (isset($_GET['get-all-ticket'])) {
    $res = $_model->GetAllTicket($activeOnly, $id_usuario);
}

if (isset($_GET['add-ticket-comment'])) {
    if ($_model->AddTicketComment($_POST)) {
        $res = [
            'err' => false,
            'message' => 'Realizado con exito!',
        ];
    } else {
        $res = [
            'err' => true,
            'message' => 'Error al realizar el proceso!',
        ];
    }
}

if (isset($_GET['finalize-ticket'])) {
    if ($_model->finalizeTicket($_POST)) {
        $res = [
            'err' => false,
            'message' => 'Realizado con exito!',
        ];
    } else {
        $res = [
            'err' => true,
            'message' => 'Error al realizar el proceso!',
        ];
    }
}

if (isset($_GET['asignamet-ticket'])) {
    if ($_model->AsignametTicket($_POST)) {
        $res = [
            'err' => false,
            'message' => 'Realizado con exito!',
        ];
    } else {
        $res = [
            'err' => true,
            'message' => 'Error al realizar el proceso!',
        ];
    }
}

if (isset($_GET['get-total-ticket-top-user'])) {
    $res = $_model->getTotalTicketByUser($top);
}

if (isset($_GET['get-ticket-today'])) {
    $res = $_model->getTicketToday();
}

if (isset($_GET['generated-report-ticket-today'])) {
    if ($_model->GenerateReportTicketToday()) {
        $res = [
            'err' => false,
            'message' => 'Realizado con exito!',
        ];
    } else {
        $res = [
            'err' => true,
            'message' => 'Error al realizar el proceso!',
        ];
    }
}

$res = json_encode($res);
echo json_encode($res);
$conn->db_close();
?>


