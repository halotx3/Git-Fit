-- *********************************Database creation*******************
drop database if exists gitfit_db;
CREATE DATABASE gitfit_db;
USE gitfit_db;

-- *********************************Creds Table*******************

CREATE TABLE usercreds
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
active boolean DEFAULT false,
	PRIMARY KEY (id)
);

-- *******************************************Profile Table***************************************

USE gitfit_db;
drop table if exists profile;
CREATE TABLE profile
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
    	last_name varchar(255) NOT NULL,
        cred_id int,
        gender varchar(1) NOT NULL,
        home_street varchar(255) NOT NULL,
		home_city varchar(255) NOT NULL,
        home_state varchar(255) NOT NULL,
		home_zip varchar(255) NOT NULL,
		mobile varchar(255) NOT NULL,
        gym_name varchar(255) NOT NULL,
        gym_street varchar(255) NOT NULL,
		gym_city varchar(255) NOT NULL,
        gym_state varchar(255) NOT NULL,
		gym_zip varchar(255) NOT NULL,
        hlatitude varchar(255),
        hlongitude varchar(255),
		glatitude varchar(255),
        glongitude varchar(255),
        primary_training_type varchar(255) NOT NULL,
        secondary_training_type varchar(255) NOT NULL,
        level varchar(12) NOT NULL,
        time_preference varchar(12) NOT NULL,
        photo varchar(255) NOT NULL,
        PRIMARY KEY (id)
);


-- *******************************************Match Table***************************************

USE gitfit_db;
drop table if exists gitfit_match;
CREATE TABLE gitfit_match
(
	id int NOT NULL AUTO_INCREMENT,
	user_id varchar(255) NOT NULL,
match_id varchar(255) NOT NULL,
approved boolean DEFAULT false,
type varchar (4) NOT NULL,
block boolean DEFAULT false,
	PRIMARY KEY (id)
);

-- *******************************************Message Table***************************************

USE gitfit_db;
drop table if exists message;
CREATE TABLE message
(
	id int NOT NULL AUTO_INCREMENT,
	to_user varchar(255) NOT NULL,
from_user varchar(255) NOT NULL,
content varchar(255) NOT NULL,
time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
