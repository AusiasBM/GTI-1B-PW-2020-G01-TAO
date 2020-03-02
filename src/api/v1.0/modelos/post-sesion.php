<?php

console.log("Hola");

if (isset($_POST['nombre_de_usuario']) && isset($_POST['contraseña'])){

    $nombre_de_usuario = $_POST['nombre_de_usuario'];
    $contraseña = $_POST['contraseña'];

    $sql = "SELECT nombre, contraseña FROM usuarios where nombre = \"$nombre_de_usuario\" and contraseña = \"$contraseña\"";

    $res = mysqli_query($conexion, $sql);

    $row = mysqli_fetch_assoc($res);

    //die($sql);

    if ($row['nombre'] == $nombre_de_usuario && $row['contraseña'] == $contraseña){
        session_start();
        $_SESSION['registrado'] = 'ok';

        $http_code = 200;
    }else{
        $http_code = 401;
    }

}else{
    $http_code = 400;
}