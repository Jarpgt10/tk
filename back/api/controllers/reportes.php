<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Reportes.php';

getHeader();

$conn = new Mysql();
$_model = new Reportes($conn);
if (isset($_GET['generated-report-ticket-today'])) {
    $_model->GenerateReportTicketToday();
}

$res = json_encode($res);
echo json_encode($res);
$conn->db_close();
?>


