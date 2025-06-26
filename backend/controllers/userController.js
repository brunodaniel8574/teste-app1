const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

// ===== controllers/userController.js =====
const db = require('../config/db');

exports.registerUser = (req, res) => {
  const { nome, email, senha, cpf } = req.body;
  db.query(
    'INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?, ?)',
    [nome, email, senha, cpf],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Erro ao cadastrar', error: err });

      const novoUsuario = {
        id: result.insertId,
        nome,
        email,
        cpf
      };

      res.status(201).json(novoUsuario);
    }
  );
};

exports.getUsers = (req, res) => {
  db.query('SELECT id, nome, email, cpf FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir usuário.' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  });
};
