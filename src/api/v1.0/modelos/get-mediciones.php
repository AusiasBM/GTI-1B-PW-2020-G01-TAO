<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = $_SESSION['idUsuario'];

    $sql = "select sondas.idSonda, mediciones.* from parcelas, posiciones, sondas, usuarios_parcelas, mediciones where usuarios_parcelas.idUsuario = $usuario and usuarios_parcelas.idParcela = parcelas.idParcela and parcelas.idParcela = posiciones.idParcela and posiciones.idPosicion = sondas.idPosicion and mediciones.idPosicion = posiciones.idPosicion";

    // Filtro
    //and parcelas.idParcela = 2

    $limit = false;

    $filtros = array();

    if (isset($_GET['idSonda'])) {
        array_push($filtros, 'sondas.idSonda = ' .  $_GET['idSonda']);
    }

    if (isset($_GET['fechaIni'])) {
        array_push($filtros, 'mediciones.dia >= ' . "'" . $_GET['fechaIni'] . "'");
        $limit = true;
    }

    if (isset($_GET['fechaFin'])) {
        array_push($filtros, 'mediciones.dia <= ' . "'" . $_GET['fechaFin'] . "'");
        $limit = true;
    }


    if (count($filtros) > 0) $sql .= ' AND ' . join(' AND ', $filtros);

    $sql .= ' ORDER BY mediciones.idMedicion DESC';



    $res = mysqli_query($conexion, $sql);

    //array_push($salida, $sql);

    while ($fila = mysqli_fetch_assoc($res)) {

        $medicion = array(
            "idSonda" => $fila["idSonda"],
            "dia" => $fila["dia"],
            "hora" =>  $fila["hora"],
            "humedad" =>  $fila["humedad"],
            "salinidad" =>  $fila["salinidad"],
            "temperatura" =>  $fila["temperatura"],
            "luminosidad" =>  $fila["luminosidad"]
        );

       array_push($salida, $medicion);

    }

    $http_code = 200;
}else{
    $http_code = 401;
}