const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

module.exports = () => {
    // Agregar un quehacer
    router.post('/agregarQuehacer', apiController.agregarQuehacer);

    // Listar quehaceres
    router.get('/quehaceres', apiController.listarQuehaceres);

    // Actualizar quehacer
    router.put('/editarQuehacer/:id', apiController.editarQuehacer);

    // Actualizar estado de un quehacer
    router.put(
        '/cambiarEstadoQuehacer/:id',
        apiController.cambiarEstadoQuehacer
    );

    // Eliminar un quehacer
    router.delete('/eliminarQuehacer/:id', apiController.eliminarQuehacer);

    // Eliminar quehaceres completados
    router.delete(
        '/eliminarQuehaceresCompletados',
        apiController.eliminarQuehaceresCompletados
    );

    // Eliminar todos los quehaceres
    router.delete('/eliminarQuehaceresTodos', apiController.eliminarTodos);

    return router;
};
