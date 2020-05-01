<?php


if (isset($_POST['nombre_de_usuario']) && isset($_POST['contraseña'])){

    $nombre_de_usuario = $_POST['nombre_de_usuario'];
    $contraseña = $_POST['contraseña'];

    $sql = "SELECT `idUsuario`, usuarios.nombre as 'nombre', contraseña, rol.nombre as 'rol' FROM usuarios, rol where usuarios.nombre = \"$nombre_de_usuario\" and contraseña = \"$contraseña\" and usuarios.rol = rol.idRol";

    $res = mysqli_query($conexion, $sql);

    $row = mysqli_fetch_assoc($res);

    //die($sql);

    if ($row['nombre'] == $nombre_de_usuario && $row['contraseña'] == $contraseña){
        session_start();
        $_SESSION['idUsuario'] = $row['idUsuario'];
        $_SESSION['nombre_usuario'] = $row['nombre'];
        $_SESSION['rol_usuario'] = $row['rol'];
        $_SESSION['registrado'] = 'ok';

        $http_code = 200;
    }else{
        $http_code = 401;
    }

}else{
    $http_code = 400;
}