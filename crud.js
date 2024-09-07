const express = require('express');
const router = express.Router();
const postgresql = require('./postgresql.js');

// Rota para listar todos os usuários (READ)
router.get('/read', (req, res) => {
  postgresql.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// Rota para criar um novo usuário (CREATE)
router.post('/create', express.json(), (req, res) => {
  const { name, email } = req.body;
  postgresql.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ id: results.insertId, name, email });
    }
  });
});

// Rota para atualizar um usuário (UPDATE)
router.put('/update/:id',  express.json(), (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  postgresql.query('UPDATE users SET name = ?, email = ? WHERE iduser = ?', [name, email, id], (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ id, name, email });
    }
  });
});

// Rota para deletar um usuário (DELETE)
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  postgresql.query('DELETE FROM users WHERE iduser = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Usuário deletado com sucesso!' });
    }
  });
});

module.exports = router;
