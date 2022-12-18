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

    // Actualizar quehacer
    router.put('/api/editarQuehacer/:id', apiController.editarQuehacer);

    // Eliminar un quehacer
    router.delete('/api/eliminarQuehacer/:id', apiController.eliminarQuehacer);

    // Eliminar quehaceres completados
    router.delete(
        '/api/eliminarQuehaceresCompletados',
        apiController.eliminarQuehaceresCompletados
    );

    return router;
};
