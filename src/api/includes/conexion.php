<?php

$bbdd_server = 'localhost:3306';
$bbdd_user = 'abaumah_prueba';
$bbdd_password = 'Password_345';
$bbdd = 'abaumah_pw_2020';

$conexion = mysqli_connect($bbdd_server,$bbdd_user,$bbdd_password,$bbdd);

mysqli_query($conexion, 'SET NAMES utf8');
