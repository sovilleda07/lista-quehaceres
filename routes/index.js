const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('home');
    });

    // Agregar un quehacer
    router.post('/api/agregarQuehacer', apiController.agregarQuehacer);

    // Listar quehaceres
    router.get('/api/quehaceres', apiController.listarQuehaceres);

    return router;
};
