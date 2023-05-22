const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'https://portfol2o.microporfolio.com'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const connection = mysql.createConnection({
  socketPath: '/run/mysqld/mysqld.sock',
  user: 'portfol2odbuser',
  password: '7t851$Ocn',
  database: 'portfol2odb'
});
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'usuarios_datos'
});*/

connection.connect((err) => {
  console.log('Connecting to database');
  if (err) throw err;
  console.log('Connected to database');
});

app.listen(3300, () => {
  console.log('Server started on port 3300');
});
// GET all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET a user by id
app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST a new user
app.post('/users', (req, res) => {
  console.log('Registrando usuario2...');
  const {name, email, password, ord} = req.body;
  connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// PUT an existing user by id
app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const {name, email, password} = req.body;
  connection.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// DELETE a user by id
app.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET all articles
app.get('/articles', (req, res) => {
  connection.query('SELECT * FROM articles', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET an article by id
app.get('/articles/:id', (req, res) => {
  const {id} = req.params;
  connection.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST a new article
app.post('/articles', (req, res) => {
  const {title, content, user_id} = req.body;
  connection.query('INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)', [title, content, user_id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// PUT an existing article by id
app.put('/articles/:id', (req, res) => {
  const {id} = req.params;
  const {title, content, user_id} = req.body;
  connection.query('UPDATE articles SET title = ?, content = ?, user_id = ? WHERE id = ?', [title, content, user_id, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// DELETE an article by id
app.delete('/articles/:id', (req, res) => {
  const {id} = req.params;
  connection.query('DELETE FROM articles WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
