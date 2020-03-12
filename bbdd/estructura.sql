-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2020 a las 13:20:37
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `estructura2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mediciones`
--

CREATE TABLE `mediciones` (
  `humdedad` int(11) DEFAULT NULL,
  `salinidad` int(11) DEFAULT NULL,
  `temperatura` int(11) DEFAULT NULL,
  `luminosidad` int(11) DEFAULT NULL,
  `idPosicion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parcelas`
--

CREATE TABLE `parcelas` (
  `idParcelas` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `tipoCultivo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parcelas`
--

INSERT INTO `parcelas` (`idParcelas`, `nombre`, `color`, `tipoCultivo`) VALUES
(1, 'Parcela 1', '#e21fd3', NULL),
(2, 'Parcela 2', '#1fe271', NULL),
(3, 'Parcela 3', '#5c2ae5', NULL),
(4, 'Parcela 4', '#bfef1e', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posicion`
--

CREATE TABLE `posicion` (
  `idPosicion` int(11) NOT NULL,
  `idParcelas` int(11) DEFAULT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posicion`
--

INSERT INTO `posicion` (`idPosicion`, `idParcelas`, `latitud`, `longitud`) VALUES
(1, 1, 38.97968, -0.167899),
(2, 1, 38.978975, -0.166734),
(3, 1, 38.979041, -0.167892),
(4, 2, 38.992288, -0.175379),
(5, 2, 38.992294, -0.175026),
(6, 2, 38.991969, -0.175152),
(7, 3, 39.052186, -0.207309),
(8, 3, 39.051949, -0.209031),
(9, 3, 39.050989, -0.207537),
(10, 4, 39.351955, -0.515728),
(11, 4, 39.351928, -0.515283),
(12, 4, 39.351314, -0.515708);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`) VALUES
(1, 'Cooperativa'),
(2, 'Administrador'),
(3, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sondas`
--

CREATE TABLE `sondas` (
  `idSonda` int(11) NOT NULL,
  `idParcelas` int(11) DEFAULT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sondas`
--

INSERT INTO `sondas` (`idSonda`, `idParcelas`, `longitud`, `latitud`) VALUES
(1, 1, 38.97968, -0.167899),
(2, 1, 38.979088, -0.167201),
(3, 2, 38.992294, -0.175026),
(4, 3, 39.052186, -0.207309),
(5, 3, 39.051719, -0.207427),
(6, 4, 39.351928, -0.515283),
(7, 4, 39.351953, -0.515004);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `contraseña` varchar(20) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `contraseña`, `rol`) VALUES
(1, 'Alfonso', 'elche', 3),
(2, 'Antonio', 'alzira', 3),
(3, 'Mario', 'villalonga', 1),
(4, 'Pedro', 'gandia', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_parcelas`
--

CREATE TABLE `usuarios_parcelas` (
  `idUsuario` int(11) DEFAULT NULL,
  `idParcelas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_parcelas`
--

INSERT INTO `usuarios_parcelas` (`idUsuario`, `idParcelas`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD KEY `idPosicion` (`idPosicion`);

--
-- Indices de la tabla `parcelas`
--
ALTER TABLE `parcelas`
  ADD PRIMARY KEY (`idParcelas`);

--
-- Indices de la tabla `posicion`
--
ALTER TABLE `posicion`
  ADD PRIMARY KEY (`idPosicion`),
  ADD UNIQUE KEY `coordenadas` (`latitud`,`longitud`),
  ADD KEY `idParcelas` (`idParcelas`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `sondas`
--
ALTER TABLE `sondas`
  ADD PRIMARY KEY (`idSonda`),
  ADD KEY `idParcelas` (`idParcelas`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `rol` (`rol`);

--
-- Indices de la tabla `usuarios_parcelas`
--
ALTER TABLE `usuarios_parcelas`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idParcelas` (`idParcelas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `parcelas`
--
ALTER TABLE `parcelas`
  MODIFY `idParcelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `posicion`
--
ALTER TABLE `posicion`
  MODIFY `idPosicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sondas`
--
ALTER TABLE `sondas`
  MODIFY `idSonda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD CONSTRAINT `mediciones_ibfk_1` FOREIGN KEY (`idPosicion`) REFERENCES `posicion` (`idPosicion`);

--
-- Filtros para la tabla `posicion`
--
ALTER TABLE `posicion`
  ADD CONSTRAINT `posicion_ibfk_1` FOREIGN KEY (`idParcelas`) REFERENCES `parcelas` (`idParcelas`);

--
-- Filtros para la tabla `sondas`
--
ALTER TABLE `sondas`
  ADD CONSTRAINT `sondas_ibfk_1` FOREIGN KEY (`idParcelas`) REFERENCES `parcelas` (`idParcelas`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol` (`idRol`);

--
-- Filtros para la tabla `usuarios_parcelas`
--
ALTER TABLE `usuarios_parcelas`
  ADD CONSTRAINT `usuarios_parcelas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `usuarios_parcelas_ibfk_2` FOREIGN KEY (`idParcelas`) REFERENCES `parcelas` (`idParcelas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
