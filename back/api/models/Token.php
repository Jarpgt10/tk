<?php
class Token
{
    private $key = 'rivas';
    private $expirationTime = 3600;

    public function generateToken($userId)
    {
        // Obtener la fecha y hora actual en formato Unix timestamp
        $currentTimestamp = time();

        // Calcular la fecha y hora de expiración sumando el tiempo de expiración al timestamp actual
        $expirationTimestamp = $currentTimestamp + $this->expirationTime; // Corrección aquí

        // Construir el token con el campo 'exp' en el payload
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'userId' => $userId,
            'exp' => $expirationTimestamp,
        ]);
        $headerBase64 = $this->base64UrlEncode($header);
        $payloadBase64 = $this->base64UrlEncode($payload);
        $signature = hash_hmac(
            'sha256',
            $headerBase64 . '.' . $payloadBase64,
            $this->key,
            true
        );
        $signatureBase64 = $this->base64UrlEncode($signature);
        $jwt = $headerBase64 . '.' . $payloadBase64 . '.' . $signatureBase64;

        return $jwt;
    }

    public function verifyToken($token)
    {
        list($headerBase64, $payloadBase64, $signature) = explode('.', $token);

        $headerPayload = $headerBase64 . '.' . $payloadBase64;
        $expectedSignature = hash_hmac(
            'sha256',
            $headerPayload,
            $this->key,
            true
        );
        $expectedSignatureBase64 = $this->base64UrlEncode($expectedSignature);

        return hash_equals($signature, $expectedSignatureBase64);
    }

    private function base64UrlEncode($data)
    {
        $base64 = base64_encode($data);
        if ($base64 === false) {
            return false;
        }

        $base64Url = strtr($base64, '+/', '-_');
        return rtrim($base64Url, '=');
    }
}

?>
