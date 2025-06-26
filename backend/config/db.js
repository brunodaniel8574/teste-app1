const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'feijaozinho', // sua senha aqui
  database: 'react_teste'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

module.exports = db;
