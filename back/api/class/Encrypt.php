<?php
class Encrypt
{
    private $key = 'R!v@s';

    public function encrypt($data)
    {
        $iv = openssl_random_pseudo_bytes(
            openssl_cipher_iv_length('aes-256-cbc')
        );
        $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
        return base64_encode($encrypted . '::' . $iv);
    }

    public function decrypt($data)
    {
        list($encryptedData, $iv) = explode('::', base64_decode($data), 2);
        return openssl_decrypt($encryptedData, 'aes-256-cbc', $key, 0, $iv);
    }
}

?>
