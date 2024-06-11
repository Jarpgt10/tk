<?php
$_DIR = explode('api', __DIR__)[0];

require_once $_DIR . 'config/helpers.php';
require_once $_DIR . 'api/class/mysql.php';
require_once $_DIR . 'api/models/Token.php';

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {
    $token = $headers['Authorization'];

    $tokenModel = new Token();
    $isValid = $tokenModel->verifyToken($token);

    if (!$isValid) {
        $res = [
            'err' => true,
            'message' => 'Unauthorized',
        ];
        echo json_encode($res);
        exit();
    }
} else {
    $res = [
        'err' => true,
        'message' => 'Unauthorized',
    ];
    echo json_encode($res);
    exit();
}

?>
