<?php

// Devolvemos el contenido de la variable $http_code.
http_response_code($http_code);

// Evita que el domino bloquee peticiones desde diferentes sitios.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Content-Type: application/json; charset: utf-8");

echo json_encode($salida, JSON_PRETTY_PRINT);