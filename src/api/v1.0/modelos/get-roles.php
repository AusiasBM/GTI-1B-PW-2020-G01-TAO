<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $rols = array(
        "numRol-tecnico" => $_SESSION['numRol_tecnico'],
        "numId_tecnico" => $_SESSION['idTecnico'],
        "nombre-tecnico" => $_SESSION['nombre_tecnico'],
        "numRol-cooperativa" => $_SESSION['numRol_cooperativa'],
        "numId-cooperativa" => $_SESSION['idCooperativa'],
        "nombre-cooperativa" => $_SESSION['nombre_cooperativa'],
        "numRol-usuario" => $_SESSION['numRol_usuario'],
        "numId-usuario" => $_SESSION['idUsuario'],
        "nombre-usuario" => $_SESSION['nombre_usuario'],
    );

    array_push($salida, $rols);

    $http_code = 200;
}else{
    $http_code = 400;
}