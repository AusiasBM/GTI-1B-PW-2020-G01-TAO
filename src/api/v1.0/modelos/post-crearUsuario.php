<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){//compruebo que la sesion esta iniciada

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $nombre_usuario = $datosRecibidos['nombre'];//guardo la variable nombre_usuario
    $rol = $datosRecibidos['rol'];//guardo la variable rol
    $coopera = $datosRecibidos['cooperativa'];

    //la sentencia sql que añade el usuario es la siguiente:
    $sqlCrearUsuario = "INSERT INTO `usuarios` (nombre, contraseña, rol) VALUE ('$nombre_usuario', '1234', '$rol')";

    mysqli_query($conexion, $sqlCrearUsuario);//ejecuto la sentencia
    //hasta aqui añade el usuario a la tabla usuarios

    if ($coopera != -1){

        $sql = "select * from usuarios where nombre = '$nombre_usuario'";

        $res = mysqli_query($conexion, $sql);

        while ($fila = mysqli_fetch_assoc($res)){

            $id = $fila["idUsuario"];
            $sqlVinculo = "INSERT INTO `clientes` VALUE ('$coopera', '$id')";
            mysqli_query($conexion, $sqlVinculo);

        }
    }



    $http_code = 200;
}else{
    $http_code = 401;
}