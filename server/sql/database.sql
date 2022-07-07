CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE USER 'test'@% IDENTIFIED WITH mysql_native_password BY 'test';

GRANT all privileges on *.* to 'test'@%;

FLUSH privileges;