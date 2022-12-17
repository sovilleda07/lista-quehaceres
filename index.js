const express = require('express');
const router = require('./routes/index');

// Crea el servidor
const app = express();
const port = process.env.PORT || 9000;

// Implementar rutas
app.use("/", router());

app.listen(port, () => console.log('servidor escuchando en puerto', port));
