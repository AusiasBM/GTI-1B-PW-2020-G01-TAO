<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    if ($datosRecibidos['tipoRol'] == 2){
        $_SESSION['numRol_cooperativa'] = 0;
        $_SESSION['idCooperativa'] = null;
        $_SESSION['nombre_cooperativa'] = "";

    }
    if ($datosRecibidos['tipoRol'] == 3){
        $_SESSION['numRol_usuario'] = 0;
        $_SESSION['idUsuario'] = null;
        $_SESSION['nombre_usuario'] = "";
    }

    array_push($salida, $_SESSION['numRol_usuario']);
    array_push($salida, $_SESSION['idUsuario']);

    $http_code = 200;
}else{
    $http_code = 400;
}