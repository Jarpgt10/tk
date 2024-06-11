<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Menu.php';

getHeader();

$conn = new Mysql();
$_model = new Menu($conn);

$activeOnly = $_GET['activeonly'] == 'true' ? 1 : 0;

if (isset($_GET['get-all-menu'])) {
    $res = $_model->getAllMenu($activeOnly);
}
$res = json_encode($res);
echo json_encode($res);
$conn->db_close();
?>
