<?php


if (isset($_POST['nombre_de_usuario']) && isset($_POST['contraseña'])){

    $nombre_de_usuario = $_POST['nombre_de_usuario'];
    $contraseña = $_POST['contraseña'];

    $sql = "SELECT `idUsuario`, usuarios.nombre as 'nombre', contraseña, rol.nombre as 'rol', usuarios.rol as 'numRol' FROM usuarios, rol where usuarios.nombre = \"$nombre_de_usuario\" and contraseña = \"$contraseña\" and usuarios.rol = rol.idRol";

    $res = mysqli_query($conexion, $sql);

    $row = mysqli_fetch_assoc($res);

    //die($sql);

    if ($row['nombre'] == $nombre_de_usuario && $row['contraseña'] == $contraseña){
        session_start();

        $_SESSION['registrado'] = 'ok';

        $_SESSION['rol_tecnico'] = "Técnico";
        $_SESSION['rol_cooperativa'] = "Cooperativa";
        $_SESSION['rol_usuario'] = "Usuario";

        $_SESSION['numRol_tecnico'] = 0;
        $_SESSION['numRol_cooperativa'] = 0;
        $_SESSION['numRol_usuario'] = 0;

        $_SESSION['nombre_tecnico'] = "";
        $_SESSION['nombre_cooperativa'] = "";
        $_SESSION['nombre_usuario'] = "";

        if ($row['numRol'] == 1){
            $_SESSION['numRol_tecnico'] = $row['numRol'];
            $_SESSION['idTecnico'] = $row['idUsuario'];
            $_SESSION['nombre_tecnico'] = $row['nombre'];
            array_push($salida, $_SESSION['numRol_tecnico']);
        }

        if ($row['numRol'] == 2){
            $_SESSION['numRol_cooperativa'] = $row['numRol'];
            $_SESSION['idCooperativa'] = $row['idUsuario'];
            $_SESSION['nombre_cooperativa'] = $row['nombre'];
            array_push($salida, $_SESSION['numRol_cooperativa']);
        }

        if ($row['numRol'] == 3){
            $_SESSION['numRol_usuario'] = $row['numRol'];
            $_SESSION['idUsuario'] = $row['idUsuario'];
            $_SESSION['nombre_usuario'] = $row['nombre'];
            array_push($salida, $_SESSION['numRol_usuario']);
        }

        $http_code = 200;
    }else{
        $http_code = 401;
    }

}else{
    $http_code = 400;
}