<?php

session_start();

if (isset($_SESSION['registrado']) && session_status() == PHP_SESSION_ACTIVE) { 
    
    session_unset(); // elimina todas las variables de sesion
    session_destroy(); // destruye la sesion
    
    $http_code = 200;
} else {
    $http_code = 401;
}