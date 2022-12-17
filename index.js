const express = require('express');

// Crea el servidor
const app = express();
const port = process.env.PORT || 9000;

app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

app.listen(port, () => console.log('servidor escuchando en puerto', port));
