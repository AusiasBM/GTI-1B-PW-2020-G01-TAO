<?php


session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $nombre_parcela = $datosRecibidos['nombre']; //guardo la variable nombre_parcela
    $color = $datosRecibidos['color'];//guardo la variable color

    $http_code = 200;
}else{
    $http_code = 400;
}