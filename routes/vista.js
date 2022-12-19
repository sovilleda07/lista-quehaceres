const express = require('express');
const router = express.Router();
const vistasController = require('../controllers/vistas');

module.exports = () => {

    // Ruta para vista de inicio
    router.get('/', vistasController.inicio);

    return router;
};
