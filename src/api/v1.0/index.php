<?php

// El once se asegura a que se incluye una vez
require_once '../includes/conexion.php';

define('API_VERSION', 'v1.0');

// Guardamos el valor de la variable
$uri = explode(API_VERSION.'/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];

// Creamos un array separando la url por /
$uri_array = explode('/',$uri);

// Extraer el primer elementos de un array
$recurso = array_shift($uri_array); // ventas

//echo $recurso;

// Guardamos la acción en minúsculas
$operacion = strtolower($_SERVER['REQUEST_METHOD']); // get

$vista = 'json';

$salida = array();

$http_code = 404;

@include "modelos/$operacion-$recurso.php"; // modelos/get-ventas.php

// Corta el flujo de la aplicación, se utiliza para hacer comprobaciones.
//die();

@include "vistas/$vista.php"; // json.php