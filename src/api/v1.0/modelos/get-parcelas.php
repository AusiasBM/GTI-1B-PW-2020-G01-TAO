<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = $_SESSION['idUsuario'];

    $sql = "SELECT parcelas.*, posicion.latitud, posicion.longitud from parcelas, usuarios_parcelas, posicion where parcelas.idParcelas =  usuarios_parcelas.idParcelas and usuarios_parcelas.idUsuario = $usuario and posicion.idParcelas = parcelas.idParcelas";


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
            $id = $fila["idParcelas"];
            $parcela = array("idParcela" => $fila["idParcelas"],
                "nombre" => $fila["nombre"],
                "color" => $fila["color"],
                "tipoCultivo" => $fila["tipoCultivo"],
                "vertices" => array());
        }

        if ($id != $fila["idParcelas"] || cont == 1){
            array_push($salida, $parcela);

            $id = $fila["idParcelas"];
            $parcela = array("idParcela" => $fila["idParcelas"],
                "nombre" => $fila["nombre"],
                "color" => $fila["color"],
                "tipoCultivo" => $fila["tipoCultivo"],
                "vertices" => array());

        }

        $vertice = array("lat" => floatval($fila["latitud"]),
                        "lng" =>  floatval($fila["longitud"]));

        array_push($parcela["vertices"], $vertice);


        $vertice = array();
}

    array_push($salida, $parcela);


    $http_code = 200;
}else{
    $http_code = 401;
}