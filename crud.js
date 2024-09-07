const express = require('express');
const router = express.Router();
const postgresql = require('./postgresql.js');

// Rota para listar todos os usuários (READ)
router.get('/read', (req, res) => {
  postgresql.query('SELECT * FROM crud.users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results.rows); // .rows é onde os resultados são armazenados
    }
  });
});

// Rota para criar um novo usuário (CREATE)
router.post('/create', express.json(), (req, res) => {
  const { name, email } = req.body;
  postgresql.query('INSERT INTO crud.users (name, email) VALUES ($1, $2) RETURNING iduser', [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: results.rows[0].id, name, email });
    }
  });
});

// Rota para atualizar um usuário (UPDATE)
router.put('/update/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  postgresql.query('UPDATE crud.users SET name = $1, email = $2 WHERE iduser = $3 RETURNING *', [name, email, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results.rows[0]);
    }
  });
});

// Rota para deletar um usuário (DELETE)
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  postgresql.query('DELETE FROM crud.users WHERE iduser = $1 RETURNING *', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Usuário deletado com sucesso!' });
    }
  });
});

module.exports = router;
