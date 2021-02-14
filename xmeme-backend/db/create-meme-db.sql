DROP DATABASE IF EXISTS meme_db;   
CREATE DATABASE IF NOT EXISTS meme_db;   
USE meme_db; 

DROP TABLE IF EXISTS memes; 

CREATE TABLE IF NOT EXISTS memes
  ( 
     id         BINARY(16) PRIMARY KEY,
     dop        DATETIME NOT NULL,
     name       VARCHAR(100) NOT NULL, 
     caption    VARCHAR(200) NOT NULL, 
     url        VARCHAR(500) UNIQUE NOT NULL
  ); 