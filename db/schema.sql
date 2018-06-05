-- Create the database cats_db and specified it for use.
DROP DATABASE IF EXISTS cats_db;
CREATE DATABASE cats_db;
USE cats_db;

-- Create the table cats.
CREATE TABLE cats
(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
cat_name varchar(40) NOT NULL,
rescued boolean DEFAULT false
);

-- Insert a set of records.
INSERT INTO cats (cat_name) VALUES ('grey tabby cat'),('ginger cat'),('black cat'),('tuxdo cat');

SELECT * FROM cats;