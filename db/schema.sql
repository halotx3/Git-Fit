CREATE DATABASE gitfit_db;
USE gitfit_db;

CREATE TABLE usercreds
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
active boolean DEFAULT false,
	PRIMARY KEY (id)
);