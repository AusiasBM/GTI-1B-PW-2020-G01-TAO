<?php

session_start();

if(isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $idUsuario = $datosRecibidos['idUsuario'];
    $sqlIdParcela = "SELECT * FROM `usuarios_parcelas` WHERE idUsuario = $idUsuario";
    $res = mysqli_query($conexion, $sqlIdParcela);

    while ($fila = mysqli_fetch_assoc($res)) {
        $parcela = $fila["idParcela"];
        $sqlEliminarParcela = "DELETE FROM `parcelas` WHERE idParcela = $parcela";
        mysqli_query($conexion, $sqlEliminarParcela);
    }

    $sqlEliminarUsuario = "DELETE FROM `usuarios` WHERE idUsuario = $idUsuario";
    mysqli_query($conexion, $sqlEliminarUsuario);

    $http_code = 200;

}else{
    $http_code = 401;
}