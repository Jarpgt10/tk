<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Area.php';

getHeader();

$conn = new Mysql();
$_model = new Area($conn);

$activeOnly = $_GET['activeonly'] == 'true' ? 1 : 0;

if (isset($_GET['get-all-area'])) {
    $res = $_model->getAllArea($activeOnly);
}

if (isset($_GET['add-or-update-area'])) {
    if ($_model->addOrUpdateArea($_POST)) {
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
