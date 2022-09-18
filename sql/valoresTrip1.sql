

INSERT INTO Trip.pais_origen (Texto)
VALUES ("Argentina"),
("Uruguay"),
("Chile"),
("España"),
("Paraguay"),
("Peru"),
("Colombia"),
("Israel"),
("Otro");


INSERT INTO Trip.interes (Texto)
VALUES ("Gastronomia"),
("Hoteleria"),
("Espectaulos"),
("Deportes"),
("Parques y Paseos");

INSERT INTO Trip.sex (Texto)
VALUES ("Femenino"),
("Masculino"),
("Otro");


INSERT INTO Trip.rubro (texto, descripcion)
VALUES ("Gastronomia", "Restorants, bares, cervezerias, pubs, etc."),
("Hoteleria", "Hoteles, hostels, pensiones, alquiler temporario, etc."),
("Espectaulos", "Cine, teatros, centros culturales, etc."),
("Deportes", "Estadios de futbol, clubes, etc."),
("Parques y Paseos", "Parques, playas, plazas, etc.");



INSERT INTO Trip.sitio (id_rubro, texto, descripcion, domicilio, telefono)
VALUES (5, "Parque Independencia", "Gran extension de parque con diversas atracciones en el corazon geografico de la ciudad", "Av Pellegrini y Av Ovidio Lagos", 000000),
(5, "La Florida", "Principal balnearo de la ciudad", "Av Carrasco 2000", 001000)
;

INSERT INTO Trip.sitio (id_rubro, texto, descripcion, domicilio, telefono)
VALUES (4, "C.A. Rosario Central", "Club de primera division", "Av GEnova 640", 000000),
(4, "C.A. NOB", "Club de primera division", "Parque Independencia", 001078),
(4, "Club PRovincial", "Historico club de la ciudad", "Parque Independencia", 4901000)
;

INSERT INTO Trip.sitio (id_rubro, texto, descripcion, domicilio, telefono)
VALUES (3, "Teatro el Circulo", "Historico e inmenso teatro", "Mendoza y Laprida", 000000),
(3, "Sala Lavarden", "Multiespacio con gran sala de teatro", "Mendoza y Sarmiento", 001000),
(3, "Cine Monumental", "Cine totalmente restaurado", "San Martin y San Luis", 001000),
(3, "Cine Showcase", "Cine abexo al shopping", "Alto Rosario Shopping", 001080)
;

INSERT INTO Trip.sitio (id_rubro, texto, descripcion, domicilio, telefono)
VALUES (2, "Pullman", "Hotel anexo al Casino City Center", "Oroño y Batle y Ordoñez", 000320),
(2, "Savoy Hotel", "Historico hotel", "Santa Fe y San Martin", 011000),
(2, "Ross Tower", "Imponente edificio cerca del rio", "Catamarca y Mitre", 001030),
(2, "Holiday Inn", "Cadena de hoteles internacional", "Dorrego 450", 001200)
;

INSERT INTO Trip.sitio (id_rubro, texto, descripcion, domicilio, telefono)
VALUES (1, "Club Fellini", "Pizzas y algo mas en una impónente esquina", "Av Pellegrini y E. Rios", 000000),
(1, "Helga", "Pizzas libres, historico local", "Av Pellegrini 1376", 001000),
(1, "Rock & Fellers", "Restorants con mucho rock", "Alto Rosario Shopping", 001000),
(1, "Fenicia", "Todo tipo de cerveza artesanal", "Francia 168", 001000),
(1, "El Cairo", "Historico bar de la ciudad", "Sarmiento y San Lorenzo", 001000),
(1, "Club de Pizzas", "Pizzeria destacada", "Av Pelegrini y E. Rios", 001000),
(1, "The Beer Pub", "Cervezeria moderna", "San Juan 1943", 001000)
;
