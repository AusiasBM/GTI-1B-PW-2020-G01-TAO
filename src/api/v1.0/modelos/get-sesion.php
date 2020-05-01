<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = array($_SESSION['idUsuario'], $_SESSION['nombre_usuario'], $_SESSION['rol_usuario']);

    array_push($salida, $usuario);

    $http_code = 200;
}else{
    $http_code = 401;
}