<?php function getHeader()
{
    header('Content-Type: application/json');
    ini_set('display_errors', 0);
    header('Access-Control-Allow-Origin: *');
    header(
        'Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Token, X-Requested-With, Encoding'
    );
}

?>
