<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $sql = "select `usuarios`.*, `rol`.`nombre` as nombreRol from `usuarios`, `rol` WHERE usuarios.rol = rol.idRol and usuarios.rol != 1";

    $filtros = array();

    if ($_SESSION['numRol_cooperativa'] != 0){
        $cooperativa = $_SESSION['idCooperativa'];
        $sql = "select `usuarios`.*, `rol`.`nombre` as nombreRol from `usuarios`, `rol`, clientes WHERE usuarios.rol = rol.idRol and clientes.idCooperativa = $cooperativa and usuarios.idUsuario = clientes.idUsuario";
    }else{
        if (isset($_GET['cooperativa'])) {
            array_push($filtros, 'usuarios.rol = 2');
        }

        if (isset($_GET['usuario'])) {
            array_push($filtros, 'usuarios.rol = 3');
        }

        if (count($filtros) > 0) $sql .= ' AND ' . join(' AND ', $filtros);
    }

    $res = mysqli_query($conexion, $sql);

    while ($fila = mysqli_fetch_assoc($res)) {
        $usuario = (array(
            "id" => $fila['idUsuario'],
            "nombre" => $fila['nombre'],
            "numRol" => $fila['rol'],
            "nombreRol" => $fila['nombreRol'],
        ));

        array_push($salida, $usuario);
    }

    $http_code = 200;
}else{
    $http_code = 401;
}