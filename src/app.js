const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

// Inicializa la aplicación Express
const app = express();
app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: '123456', // Reemplaza con tu contraseña de MySQL
  database: 'usuarios_datos' // Reemplaza con tu base de datos de MySQL
});

// Ruta de registro
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Username and password are required');
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name,email, hashedPassword], (error, results) => {
      connection.release();
      if (error) {
        res.status(500).send('An error occurred during registration');
      } else {
        res.status(200).send('User registered successfully');
      }
    });
  });
});

// Ruta de inicio de sesión
app.post('/auth/login', (req, res) => {

  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {


    return res.status(400).send('Username and password are required');
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      connection.release();

      if (error || results.length === 0) {
        res.status(400).send('Invalid credentials1');
      } else {
        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
          res.status(400).send('Invalid credentials2');
        } else {
          const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
          res.status(200).send({ token });
        }
      }
    });
  });
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
