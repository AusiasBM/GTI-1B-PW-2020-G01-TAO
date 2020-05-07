<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){//compruebo que la sesion esta iniciada

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    $usuario = $_SESSION['idUsuario'];


    $idParcela = $datosRecibidos['id'];
    $nombre_parcela = $datosRecibidos['nombre']; //guardo la variable nombre_parcela
    $color = $datosRecibidos['color'];//guardo la variable color
    $vertices = array();
    $vertices = $datosRecibidos['vertices'];
    
    
    //la sentencia sql que actualiza el nombre y el color la parcela es la siguiente:
    $sqlParcela = "UPDATE `parcelas` SET  nombre = '$nombre_parcela', color = '$color' WHERE idParcela = $idParcela";

    mysqli_query($conexion, $sqlParcela);//ejecuto la sentencia


    $sqlVertices= "delete FROM `vertices` WHERE idParcela = $idParcela";
    $losVertices = mysqli_query($conexion, $sqlVertices);//ejecuto la sentencia


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
