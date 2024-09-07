const { Pool } = require('pg');

// Configurações do banco de dados
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'crud',
  password: 'root',
  port: 5432,
});

// Função para executar consultas SQL
const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = {
  query,
};
