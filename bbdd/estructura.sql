
CREATE DATABASE pw_2020;

USE pw_2020;

CREATE table rol(nombre VARCHAR(30) PRIMARY KEY);

CREATE TABLE usuarios(nombre VARCHAR(30) PRIMARY KEY, contraseña VARCHAR(20) NOT NULL, rol VARCHAR(30) NOT NULL, FOREIGN KEY (rol) references rol(nombre));

INSERT INTO rol VALUES ("Cooperativa"), ("Administrador"), ("Usuario");

INSERT INTO usuarios VALUES
    ("Alfonso", "elche", "Usuarios"),
    ("Antonio", "alzira", "Usuarios"),
    ("Mario", "villalonga", "Cooperativa"),
    ("Pedro", "gandia", "Cooperativa");