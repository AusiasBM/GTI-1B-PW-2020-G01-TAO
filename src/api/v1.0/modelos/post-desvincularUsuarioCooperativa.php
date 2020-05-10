<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){//compruebo que la sesion esta iniciada

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $usuario = $datosRecibidos['idUsuario'];
    $cooperativa = $_SESSION['idCooperativa'];

    $sqlExiste = "DELETE FROM `clientes` where idUsuario = $usuario and idCooperativa = $cooperativa";

    mysqli_query($conexion, $sqlExiste);

    $http_code = 200;

}else{
    $http_code = 401;
}