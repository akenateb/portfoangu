const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

// Inicializa la aplicación Express
const app = express();
// Configuración de CORS
app.use(cors({
  origin: 'https://server.ionos.com'
}));
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: '/run/mysqld/mysqld.sock',
  user: 'portfol2odbuser', // Reemplaza con tu usuario de MySQL
  password: '7t851$Ocn', // Reemplaza con tu contraseña de MySQL
  database: 'portfol2odb', // Reemplaza con tu base de datos de MySQL
  connectionLimit: 10 // Número máximo de conexiones simultáneas
});

// Ruta de registro
app.post('/auth/register', (req, res) => {
  console.log('Registrando usuario...');
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Username and password are required');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, hashedPassword];

  console.log('Query:', query, 'Values:', values); // Agrega este console.log

  pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name,email, hashedPassword], (error, results) => {
    if (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).send('Email already registered');
      } else {
        res.status(500).send(`An error occurred during registration: ${error.sqlMessage}`);
      }
    } else {
      res.status(200).json({ message: 'User registered successfully' });

    }
  });
});

// Ruta de inicio de sesión
app.post('/auth/login', (req, res) => {

  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).send('Username and password are required');
  }

  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
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

// Iniciar el servidor
app.listen(5500, () => {
  console.log('Server started on port 5500');
});
