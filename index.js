const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const router = require('./routes/index');

// Crea el servidor
const app = express();
const port = process.env.PORT || 9000;

// Habilitar Handlebars como Template Engine
app.engine(
    'handlebars',
    exphbs.engine({ extname: '.handlebars', defaultLayout: 'layout' })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Implementar rutas
app.use("/", router());

app.listen(port, () => console.log('servidor escuchando en puerto', port));
