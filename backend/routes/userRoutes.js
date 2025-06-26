const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // caminho correto

router.post('/register', userController.registerUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser); // <-- ADICIONADA AQUI

module.exports = router;
