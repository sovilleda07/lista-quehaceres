const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require("path");
const bodyParser = require('body-parser');
const router = require('./routes/index');
require('dotenv').config();

// Crea el servidor
const app = express();
const port = process.env.PORT || 9000;

// Conexión a MongoDB Atlas
mongoose.set('strictQuery', false);
mongoose.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.nsamh.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on('connected', () => {
    console.log('Conectado a la instancia de Mongo');
});
mongoose.connection.on('error', (err) => {
    console.log('Error al conectarse a Mongo', err);
});

// Habilitar middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
