<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){//compruebo que la sesion esta iniciada

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $usuario = $_SESSION['idUsuario'];

    $nombre_parcela = $datosRecibidos['nombre']; //guardo la variable nombre_parcela
    $color = $datosRecibidos['color'];//guardo la variable color
    $vertices = array();
    $vertices = $datosRecibidos['vertices'];

    //la sentencia sql que añade la parcela es la siguiente:
    $sqlParcela = "INSERT INTO `parcelas` (nombre, color) VALUE ('$nombre_parcela', '$color')";

    mysqli_query($conexion, $sqlParcela);//ejecuto la sentencia
    //hasta aqui añade la parcela a la tabla parcela

    $sqlidParcela= "SELECT * FROM `parcelas` WHERE nombre = '$nombre_parcela'";
    $laParcela = mysqli_query($conexion, $sqlidParcela);//ejecuto la sentencia
    $idParcela = mysqli_fetch_assoc($laParcela)["idParcela"];

    $sqlUsuarioParcela = "INSERT INTO `usuarios_parcelas` VALUES ('$usuario', '$idParcela')";
    mysqli_query($conexion, $sqlUsuarioParcela);//ejecuto la sentencia

    for($i = 1; $i<=count($vertices)-1; $i++){

        $vertice=preg_split("/[\s,]+/", $vertices[$i]);
        $latitud=$vertice[1];
        $longitud=$vertice[4];
        $sqlInsertarVertices="INSERT INTO `vertices` (idParcela, latitud, longitud) VALUES ('$idParcela', '$latitud', '$longitud')";

        mysqli_query($conexion,$sqlInsertarVertices);
    }

    $http_code = 200;
}else{
    $http_code = 401;
}










