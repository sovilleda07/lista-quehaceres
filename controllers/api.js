// Controlador para gestionar las peticiones a la API.

// Importar el modelo necesario para el controller
const Quehacer = require('../models/Quehacer');

// Agregar un quehacer
exports.agregarQuehacer = async (req, res) => {
    // Obtener la información de la petición y crear un objeto con el esquema.
    const quehacer = new Quehacer(req.body);

    // Almacenar en la base de datos
    try {
        await quehacer.save();
        res.status(200).send({
            error: null,
            mensaje: 'Quehacer guardado.',
            resultado: null,
        });
    } catch (error) {
        // Verificar si es un error de validación
        if (error.name === 'ValidationError') {
            // Crear un objeto de errores
            let errores = {};
            // Recorre la lista de errores y los almacena
            Object.keys(error.errors).forEach((key) => {
                errores[key] = error.errors[key].message;
            });

            // Envía respuesta
            res.status(400).send({
                error: errores,
                mensaje: 'Se ha producido un error con las validaciones.',
                resultado: null,
            });
        } else {
            // Se presentó algún problema
            res.status(422).send({
                error: error,
                mensaje: 'Se ha producido un error inesperado.',
                resultado: null,
            });
        }
    }
};
