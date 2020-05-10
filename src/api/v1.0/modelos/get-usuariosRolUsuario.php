<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok') {

    $sql = "select `usuarios`.*, `rol`.`nombre` as nombreRol from `usuarios`, `rol` WHERE usuarios.rol = rol.idRol and usuarios.rol = 3";


    $res = mysqli_query($conexion, $sql);

    while ($fila = mysqli_fetch_assoc($res)) {
        $usuario = (array(
            "id" => $fila['idUsuario'],
            "nombre" => $fila['nombre'],
            "numRol" => $fila['rol'],
            "nombreRol" => $fila['nombreRol'],
        ));

        array_push($salida, $usuario);
    }

    $http_code = 200;
} else {
    $http_code = 401;
}