<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Login.php';
require_once $_DIR . 'api/models/Token.php';
require_once $_DIR . 'api/class/Encrypt.php';

getHeader();

$conn = new Mysql();
$_model = new Login($conn);
$_tokenModel = new Token();
$_modelEncrypt = new Encrypt();

if (isset($_GET['login'])) {
    if ($id_usuario = $_model->Login($_POST)) {
        if (intval($id_usuario) > 0) {
            $token = $_tokenModel->generateToken($id_usuario);
            $res['token'] = $token;
            $res['usuario'] = $_modelEncrypt->encrypt($id_usuario);
        }
    }
}

if (isset($_GET['get-data-user'])) {
    if (!empty($_POST['token'])) {
        $isVerify = $_tokenModel->verifyToken($_POST['token']);
        if ($isVerify) {
            $id_usuario = intval($_modelEncrypt->decrypt($_POST['usuario']));
            $res = $_model->getUserById($id_usuario);
        } else {
            $res = [
                'isVerifyToken' => false,
                'err' => true,
                'message' => 'Token Experiado!',
            ];
        }
    } else {
        $res = [
            'isVerifyToken' => false,
            'err' => true,
            'message' => 'Error en la obtencion del token',
        ];
    }
}

$res = json_encode($res);
echo json_encode($res);
$conn->db_close();
?>

