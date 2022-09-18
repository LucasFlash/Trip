
CREATE DATABASE Trip;


 
CREATE TABLE Trip.pais_origen (
	id_pais_origen int NOT NULL AUTO_INCREMENT,
	texto varchar(50) NOT NULL,
	PRIMARY KEY (id_pais_origen)
);
 
CREATE TABLE Trip.interes (
	id_interes int NOT NULL AUTO_INCREMENT,
	texto varchar(50) NOT NULL,
	PRIMARY KEY (id_interes)
);
 
CREATE TABLE Trip.sex (
	id_sex int NOT NULL AUTO_INCREMENT,
	texto varchar(50) NOT NULL,
	PRIMARY KEY (id_sex)
);
 
 CREATE TABLE Trip.usuario (
    id int NOT NULL AUTO_INCREMENT,
    user varchar(50) NOT NULL, 
    email varchar(50) NOT NULL,
    pass varchar(255) NOT NULL,
	fecha_nac date,
	fecha_alta date NOT NULL,
	id_sex int,  
    id_pais_origen int,
	id_interes int,
	PRIMARY KEY (id),
	FOREIGN KEY (id_pais_origen) REFERENCES pais_origen(id_pais_origen),
	FOREIGN KEY (id_sex) REFERENCES sex(id_sex),
	FOREIGN KEY (id_interes) REFERENCES interes(id_interes)
);


CREATE TABLE Trip.rubro (
	id_rubro int NOT NULL AUTO_INCREMENT,
     texto varchar(50) NOT NULL,
	descripcion text,
	PRIMARY KEY (id_rubro)
);
 
CREATE TABLE Trip.sitio (
	id_sitio int NULL AUTO_INCREMENT,
	id_rubro int NOT NULL,
	texto varchar(50) NOT NULL,
	descripcion text,
	domicilio varchar(50),
	telefono bigint,
	PRIMARY KEY (id_sitio),
	FOREIGN KEY (id_rubro) REFERENCES rubro(id_rubro)
);

CREATE TABLE Trip.resena (
	id_resena int NOT NULL AUTO_INCREMENT,
	id_usuario int NOT NULL,
	id_sitio int NOT NULL,
    id_rubro int NOT NULL,
	descripcion text,
	ranking int,
	PRIMARY KEY (id_resena),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	FOREIGN KEY (id_sitio) REFERENCES sitio(id_sitio),
    FOREIGN KEY (id_rubro) REFERENCES rubro(id_rubro)
);
 
 
CREATE TABLE Trip.consulta_usuario (
    id_consulta_usuario int NOT NULL AUTO_INCREMENT,
	id_usuario int NOT NULL,
	descripcion text,
	PRIMARY KEY (id_consulta_usuario),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);
 
CREATE TABLE Trip.respuesta_usuario (
    id_respuesta_usuario int NOT NULL AUTO_INCREMENT,
    id_consulta_usuario int NOT NULL,
	id_usuario int NOT NULL,
	descripcion text,
    PRIMARY KEY (id_respuesta_usuario),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

