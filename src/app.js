const express = require('express');
const bodyParser = require('body-parser');
const {db} = require('./db/db'); // Asegúrate de tener la ruta correcta

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html'); // Archivo HTML para el formulario de inicio de sesión
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    
    if (!row) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ message: 'Inicio de sesión exitoso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
