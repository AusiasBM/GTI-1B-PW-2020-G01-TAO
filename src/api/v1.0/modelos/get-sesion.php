<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = $_SESSION['idUsuario'];

    $sql = "SELECT nombre, rol FROM usuarios where idUsuario = \"$usuario\"";

    $res = mysqli_query($conexion, $sql);

    $row = mysqli_fetch_assoc($res);

    array_push($salida, $row);

    $http_code = 200;
}else{
    $http_code = 401;
}