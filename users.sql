CREATE DATABASE login_jwt;

\c login_jwt;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(40) NOT NULL
);