-- Criar o schema 'crud'
CREATE SCHEMA crud;

-- Criar a tabela 'users' no schema 'crud'
CREATE TABLE crud.users (
    iduser SERIAL PRIMARY KEY,
    name VARCHAR(545),
    email VARCHAR(545)
);
