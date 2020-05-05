/*---------- TABLA ROLES----------*/
CREATE table rol(
    idRol      INT PRIMARY KEY AUTO_INCREMENT UNIQUE, 
    nombre     VARCHAR(30)
 );
 
 INSERT INTO rol(nombre) VALUES
                            ("técnico"),
                            ("Cooperativa"),
                            ("Usuario");

/*---------- TABLA USUARIOS----------*/
CREATE TABLE usuarios(
    idUsuario   INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    nombre      VARCHAR(30), 
    contraseña  VARCHAR(20) NOT NULL, 
    rol         INT NOT NULL, 
    FOREIGN KEY (rol) references rol(idRol)
);

INSERT INTO usuarios(nombre, contraseña, rol) VALUES 
                                                ("Alfonso", "elche", 3), 
                                                ("Antonio", "alzira", 3),
                                                ("Mario", "villalonga", 1), 
                                                ("Pedro", "gandia", 2);

/*---------- TABLA CLIENTES ----------*/

CREATE TABLE clientes(
    idCooperativa       int(11) DEFAULT NULL,
    idUsuario           int(11) DEFAULT NULL,
    FOREIGN KEY (idCooperativa) references usuarios(idUsuario),
    FOREIGN KEY (idUsuario) references usuarios(idUsuario)
);

INSERT INTO clientes(idCooperativa, idUsuario) VALUES
                                                (4, 1),
                                                (4, 2);


/*---------- TABLA PARCELAS ----------*/

CREATE TABLE parcelas(
    idParcela   INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    nombre      varchar(11) NOT NULL,
    color       varchar(30) NOT NULL,
    tipoCultivo varchar(30) DEFAULT NULL
);

INSERT INTO parcelas (nombre, color) VALUES 
                                        ("Parcela 1", '#e21fd3'), 
                                        ("Parcela 2", '#1fe271'), 
                                        ("Parcela 3", '#5c2ae5'), 
                                        ("Parcela 4", '#bfef1e');



/*---------- TABLA USUARIOS_PARCELAS----------*/
CREATE TABLE usuarios_parcelas(
    idUsuario       int(11) DEFAULT NULL,
    idParcela       int(11) DEFAULT NULL,
    FOREIGN KEY (idUsuario) references usuarios(idUsuario),
    FOREIGN KEY (idParcela) references parcelas(idParcela) ON DELETE CASCADE
);

INSERT INTO usuarios_parcelas (idUsuario, idParcela) VALUES 
                                                        (1, 1), 
                                                        (1, 2), 
                                                        (1, 3), 
                                                        (2, 4);



/*----------TABLA VERTICES----------*/
CREATE TABLE vertices(
    idVertice       INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    idParcela       int(11) DEFAULT NULL,
    latitud         double NOT NULL,
    longitud        double NOT NULL,
    FOREIGN KEY (idParcela) references parcelas(idParcela) ON DELETE CASCADE
);

INSERT INTO vertices(idParcela, latitud, longitud) VALUES 
                                                    (1, 38.997381, -0.169717),
                                                    (1, 38.996555, -0.167642),
                                                    (1, 38.995685, -0.169697),
                                                    (1, 38.995691, -0.170137),
                                                    (2, 38.998363, -0.167731),
                                                    (2, 38.997917, -0.166991),
                                                    (2, 38.996812, -0.168042),
                                                    (2, 38.997041, -0.168605),
                                                    (3, 38.998529, -0.166685),
                                                    (3, 38.997878, -0.166826),
                                                    (3, 38.998824, -0.168365),
                                                    (3, 38.999070, -0.168733),
                                                    (3, 38.999712, -0.167746),
                                                    (4, 38.992794, -0.167716),
                                                    (4, 38.993530, -0.167579),
                                                    (4, 38.993499, -0.168604);


/*---------- TABLA POSICIONES----------*/
CREATE TABLE posiciones(
    idPosicion      INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    idParcela       int(11) DEFAULT NULL,
    latitud         double NOT NULL,
    longitud        double NOT NULL,
    FOREIGN KEY (idParcela) references parcelas(idParcela) ON DELETE CASCADE
);

INSERT INTO posiciones(idParcela, latitud, longitud) VALUES 
                                                        (1, 38.995967, -0.169724), 
                                                        (1, 38.996717, -0.168954), 
                                                        (2, 38.997559, -0.167884), 
                                                        (3, 38.998940, -0.168153), 
                                                        (3, 38.998571, -0.167057), 
                                                        (4, 38.993406, -0.168361),
                                                        (4, 38.993034, -0.167761);


/*---------- TABLA MEDICIONES----------*/
CREATE TABLE mediciones(
    idMedicion      INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    idPosicion      int(11) DEFAULT NULL,
    dia             DATE DEFAULT NULL,
    hora            TIME DEFAULT NULL,
    humedad         int(11) DEFAULT NULL,
    salinidad       int(11) DEFAULT NULL,
    temperatura     int(11) DEFAULT NULL,
    luminosidad     int(11) DEFAULT NULL,
    FOREIGN KEY (idPosicion) references posiciones(idPosicion) ON DELETE CASCADE
);

INSERT INTO mediciones(idPosicion, dia, hora, humedad, salinidad, temperatura, luminosidad) VALUES 
                                /*  PO    Fecha       Hora    HU  SA  TE  LU   */
                                    (1, '2020-03-20', '18:00:00', 10, 15, 20, 100),
                                    (1, '2020-03-20', '08:00:00', 40, 20, 10, 50),
                                    (1, '2020-03-20', '02:00:00', 70, 30, 5, 0),
                                    (1, '2020-03-19', '18:00:00', 5, 10, 30, 70),
                                    (1, '2020-03-19', '08:00:00', 60, 10, 20, 40),
                                    (1, '2020-03-19', '02:00:00', 80, 25, 3, 0),
                                    (2, '2020-03-20', '18:00:00', 20, 5, 25, 80),
                                    (2, '2020-03-20', '08:00:00', 70, 5, 20, 30),
                                    (2, '2020-03-20', '02:00:00', 70, 10, 15, 0),
                                    (2, '2020-03-19', '18:00:00', 10, 15, 20, 100),
                                    (2, '2020-03-19', '08:00:00', 40, 20, 10, 50),
                                    (2, '2020-03-19', '02:00:00', 70, 30, 5, 0),
                                    (3, '2020-03-20', '18:00:00', 10, 15, 20, 100),
                                    (3, '2020-03-20', '08:00:00', 40, 20, 10, 50),
                                    (3, '2020-03-20', '02:00:00', 70, 30, 5, 0),
                                    (3, '2020-03-19', '18:00:00', 5, 10, 30, 70),
                                    (3, '2020-03-19', '08:00:00', 60, 10, 20, 40),
                                    (3, '2020-03-19', '02:00:00', 80, 25, 3, 0),
                                    (4, '2020-03-20', '18:00:00', 20, 5, 25, 80),
                                    (4, '2020-03-20', '08:00:00', 70, 5, 20, 30),
                                    (4, '2020-03-20', '02:00:00', 70, 10, 15, 0),
                                    (4, '2020-03-19', '18:00:00', 10, 15, 20, 100),
                                    (4, '2020-03-19', '08:00:00', 40, 20, 10, 50),
                                    (4, '2020-03-19', '02:00:00', 70, 30, 5, 0),
                                    (5, '2020-03-20', '18:00:00', 10, 15, 20, 100),
                                    (5, '2020-03-20', '08:00:00', 40, 20, 10, 50),
                                    (5, '2020-03-20', '02:00:00', 70, 30, 5, 0),
                                    (5, '2020-03-19', '18:00:00', 5, 10, 30, 70),
                                    (5, '2020-03-19', '08:00:00', 60, 10, 20, 40),
                                    (5, '2020-03-19', '02:00:00', 80, 25, 3, 0),
                                    (6, '2020-03-20', '18:00:00', 20, 5, 25, 80),
                                    (6, '2020-03-20', '08:00:00', 70, 5, 20, 30),
                                    (6, '2020-03-20', '02:00:00', 70, 10, 15, 0),
                                    (6, '2020-03-19', '18:00:00', 10, 15, 20, 100),
                                    (6, '2020-03-19', '08:00:00', 40, 20, 10, 50),
                                    (6, '2020-03-19', '02:00:00', 70, 30, 5, 0),
                                    (7, '2020-03-20', '18:00:00', 10, 15, 20, 100),
                                    (7, '2020-03-20', '08:00:00', 40, 20, 10, 50),
                                    (7, '2020-03-20', '02:00:00', 70, 30, 5, 0),
                                    (7, '2020-03-19', '18:00:00', 5, 10, 30, 70),
                                    (7, '2020-03-19', '08:00:00', 60, 10, 20, 40),
                                    (7, '2020-03-19', '02:00:00', 80, 25, 3, 0);


/*---------- TABLA SONDAS----------*/
CREATE TABLE sondas(
    idSonda         INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    idPosicion      int(11) NOT NULL,
    FOREIGN KEY (idPosicion) references posiciones(idPosicion) ON DELETE CASCADE
);

INSERT INTO sondas(idPosicion) VALUES 
                                    (1),
                                    (2),
                                    (3),
                                    (4),
                                    (5),
                                    (6),
                                    (7);




