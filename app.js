// Importar las dependencias
const express = require('express');
const mysql = require('mysql'); // Reemplaza 'mysql' con 'pg' o 'mongodb' si estás usando PostgreSQL o MongoDB, respectivamente.

// Crear una instancia de Express
const app = express();

// Configurar el puerto del servidor
const port = 3000; // Puedes cambiar este número si prefieres usar otro puerto.

// Configurar la conexión a la base de datos (MySQL en este ejemplo)
const dbConfig = {
  host: 'localhost',
  user: 'usuario_db', // Reemplaza con el usuario de tu base de datos.
  password: 'contraseña_db', // Reemplaza con la contraseña de tu base de datos.
  database: 'mi_proyecto_crud_1' // Reemplaza con el nombre de tu base de datos.
};

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Configurar el servidor para recibir datos en formato JSON
app.use(express.json());

// Rutas para las operaciones CRUD
// Ejemplo de ruta para crear un nuevo registro (C - Create)
app.post('/create', (req, res) => {
  // Obtener los datos enviados desde el cliente
  const { campo1, campo2, campo3 } = req.body;

  // Ejemplo de consulta a la base de datos para insertar un nuevo registro
  const sql = `INSERT INTO tabla (campo1, campo2, campo3) VALUES (?, ?, ?)`;
  const values = [campo1, campo2, campo3];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar el registro:', err.message);
      res.status(500).json({ error: 'Error al insertar el registro' });
    } else {
      console.log('Registro insertado correctamente.');
      res.status(201).json({ message: 'Registro insertado correctamente' });
    }
  });
});

// Ejemplo de ruta para leer registros (R - Read)
app.get('/read', (req, res) => {
  // Ejemplo de consulta a la base de datos para obtener todos los registros
  const sql = `SELECT * FROM tabla`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros:', err.message);
      res.status(500).json({ error: 'Error al obtener los registros' });
    } else {
      console.log('Registros obtenidos correctamente.');
      res.status(200).json(result);
    }
  });
});

// Ejemplo de ruta para actualizar un registro (U - Update)
app.put('/update/:id', (req, res) => {
  // Obtener el ID del registro a actualizar desde los parámetros de la URL
  const id = req.params.id;

  // Obtener los nuevos datos enviados desde el cliente
  const { nuevoCampo1, nuevoCampo2, nuevoCampo3 } = req.body;

  // Ejemplo de consulta a la base de datos para actualizar el registro
  const sql = `UPDATE tabla SET campo1 = ?, campo2 = ?, campo3 = ? WHERE id = ?`;
  const values = [nuevoCampo1, nuevoCampo2, nuevoCampo3, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err.message);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      console.log('Registro actualizado correctamente.');
      res.status(200).json({ message: 'Registro actualizado correctamente' });
    }
  });
});

// Ejemplo de ruta para eliminar un registro (D - Delete)
app.delete('/delete/:id', (req, res) => {
  // Obtener el ID del registro a eliminar desde los parámetros de la URL
  const id = req.params.id;

  // Ejemplo de consulta a la base de datos para eliminar el registro
  const sql = `DELETE FROM tabla WHERE id = ?`;
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err.message);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      console.log('Registro eliminado correctamente.');
      res.status(200).json({ message: 'Registro eliminado correctamente' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web iniciado en http://localhost:${port}`);
});
