const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

// Ruta para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor estático en funcionamiento en http://localhost:${port}`);
});
