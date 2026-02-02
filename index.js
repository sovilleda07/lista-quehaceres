const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Crea el servidor
const app = express();
const port = process.env.PORT || 9000;

// Declaración de Routers
const apiRouter = require('./routes/index');
const vistaRouter = require('./routes/vista');

// Conexión a MongoDB Atlas
mongoose.set('strictQuery', false);
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1rurold.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
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
    exphbs.engine({
        extname: '.handlebars',
        defaultLayout: 'layout',
        partialsDir: __dirname + '/views/partials/',
    })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Implementar rutas
app.use('/', vistaRouter());
app.use('/api', apiRouter());

app.listen(port, () => console.log('servidor escuchando en puerto', port));
