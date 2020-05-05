<?php


session_start();

if(isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $datosRecibidos = json_decode(file_get_contents('php://input'),true);

    if(isset($datosRecibidos['idParcela'])){

        $parcela = $datosRecibidos['idParcela'];

        $sql = "DELETE FROM `parcelas` WHERE idParcela = $parcela;";

        $res = mysqli_query($conexion, $sql);

        $http_code = 200;
    }else{
        $http_code = 400;
    }

}else{
    $http_code = 401;
}
