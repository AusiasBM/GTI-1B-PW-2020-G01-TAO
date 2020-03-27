<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = $_SESSION['idUsuario'];

    $sql = "select parcelas.*, vertices.latitud, vertices.longitud from parcelas, usuarios_parcelas, vertices where usuarios_parcelas.idUsuario = $usuario and parcelas.idParcela = usuarios_parcelas.idParcela and vertices.idParcela = parcelas.idParcela";

    $filtros = array();

    if (isset($_GET['nombre'])) {
        array_push($filtros, 'parcelas.nombre = ' .  '"' . $_GET['nombre'] . '"');
    }

    if (count($filtros) > 0) $sql .= ' AND ' . join(' AND ', $filtros);

    $res = mysqli_query($conexion, $sql);

    $id = '-1';
    $cont = $res ->num_rows;
    $vertice = array();

    while ($fila = mysqli_fetch_assoc($res)) {

        if ($id == '-1'){
            $id = $fila["idParcela"];
            $parcela = array("idParcela" => $fila["idParcela"],
                "nombre" => $fila["nombre"],
                "color" => $fila["color"],
                "tipoCultivo" => $fila["tipoCultivo"],
                "vertices" => array());
        }

        if ($id != $fila["idParcela"] || cont == 1){
            array_push($salida, $parcela);

            $id = $fila["idParcela"];
            $parcela = array("idParcela" => $fila["idParcela"],
                "nombre" => $fila["nombre"],
                "color" => $fila["color"],
                "tipoCultivo" => $fila["tipoCultivo"],
                "vertices" => array());

        }

        $cont = $cont -1;

        $vertice = array("lat" =>  floatval($fila["latitud"]),
                         "lng" =>  floatval($fila["longitud"]));

        array_push($parcela["vertices"], $vertice);

        $vertice = array();
}

    array_push($salida, $parcela);

    $http_code = 200;
}else{
    $http_code = 401;
}