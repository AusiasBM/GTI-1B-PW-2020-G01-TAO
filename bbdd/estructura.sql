
CREATE table rol(codigo INT PRIMARY KEY AUTO_INCREMENT UNIQUE, nombre VARCHAR(30));

CREATE TABLE usuarios(codigo INT PRIMARY KEY AUTO_INCREMENT UNIQUE,nombre VARCHAR(30), contraseña VARCHAR(20) NOT NULL, rol INT NOT NULL, FOREIGN KEY (rol) references rol(codigo));

INSERT INTO rol(nombre) VALUES ("Cooperativa"), ("Administrador"), ("Usuario");

INSERT INTO usuarios(nombre, contraseña, rol) VALUES ("Alfonso", "elche", 3), ("Antonio", "alzira", 3),("Mario", "villalonga", 1), ("Pedro", "gandia", 1);