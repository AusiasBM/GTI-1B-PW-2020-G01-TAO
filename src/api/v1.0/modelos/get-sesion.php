<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario =$rols = array(
        $_SESSION['numRol_tecnico'],
        $_SESSION['rol_tecnico'],
        $_SESSION['nombre_tecnico'],
        $_SESSION['numRol_cooperativa'],
        $_SESSION['rol_cooperativa'],
        $_SESSION['nombre_cooperativa'],
        $_SESSION['numRol_usuario'],
        $_SESSION['rol_usuario'],
        $_SESSION['nombre_usuario'],
        $_SESSION['idCooperativa'],
    );;

    array_push($salida, $usuario);

    $http_code = 200;
}else{
    $http_code = 401;
}