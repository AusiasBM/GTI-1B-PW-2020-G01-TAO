<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){//compruebo que la sesion esta iniciada

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $usuario = $datosRecibidos['idUsuario'];
    $cooperativa = $_SESSION['idCooperativa'];

    $sqlExiste = "SELECT * FROM `clientes` where idUsuario = $usuario and idCooperativa = $cooperativa";

    $res = mysqli_query($conexion, $sqlExiste);

    if($res->num_rows == 0){
        $sqlVinculo = "INSERT INTO `clientes` VALUE ('$cooperativa', '$usuario')";

        mysqli_query($conexion, $sqlVinculo);
        $http_code = 200;
    }else{
        $http_code = 400;
    }


}else{
    $http_code = 401;
}