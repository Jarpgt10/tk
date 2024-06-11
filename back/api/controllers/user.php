<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/User.php';

getHeader();

$conn = new Mysql();
$_model = new User($conn);

$activeOnly = $_GET['activeonly'] == 'true' ? 1 : 0;

if (isset($_GET['get-all-users'])) {
    $res = $_model->getAllUser($activeOnly);
}

if (isset($_GET['add-or-update-user'])) {
    if ($_model->addOrUpdateUser($_POST)) {
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


