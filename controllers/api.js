// Controlador para gestionar las peticiones a la API.

// Importar el modelo necesario para el controller
const Quehacer = require('../models/Quehacer');

// Agregar un quehacer
exports.agregarQuehacer = async (req, res) => {
    // Obtener la información de la petición y crear un objeto con el esquema.
    const quehacer = new Quehacer(req.body);

    // Almacenar en la base de datos
    try {
        // Retorna el quehacer guardado
        const elQuehacer = await quehacer.save();

        res.status(200).send({
            error: null,
            mensaje: 'Quehacer guardado.',
            resultado: elQuehacer,
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

// Listar todos los quehaceres
exports.listarQuehaceres = async (req, res) => {
    try {
        // Realizar la consulta
        const losQuehaceres = await Quehacer.find({});

        // Si no hay quehaceres registrados
        if (losQuehaceres.length === 0) {
            res.status(404).send({
                error: null,
                mensaje: 'No hay quehaceres registrados.',
                resultado: null,
            });
        } else {
            res.status(200).send({
                error: null,
                mensaje: 'Listando quehaceres',
                resultado: losQuehaceres,
            });
        }
    } catch (error) {
        res.status(422).send({
            error: error,
            mensaje: 'Hubo un problema al momento de obtener los quehaceres.',
            resultado: null,
        });
    }
};

// Editar un quehacer
exports.editarQuehacer = async (req, res) => {
    // Obtener el id del quehacer
    const { id } = req.params;
    // Destructuring del nombre de la tarea
    const { tarea } = req.body;

    try {
        // Realizar actualización, enviando el filtro del id
        const elQuehacer = await Quehacer.findOneAndUpdate(
            { _id: id },
            { $set: { tarea: tarea, fechaModificado: new Date() } },
            {
                new: true,
                runValidators: true,
            }
        );

        // Evaluamos si se realizó la operación
        if (!elQuehacer) {
            // Sino se actualizó, el quehacer no existe
            res.status(404).send({
                error: null,
                mensaje: 'El quehacer no existe.',
                resultado: null,
            });
        } else {
            // Confirmar actualización
            res.status(200).send({
                error: null,
                mensaje: 'Quehacer actualizado.',
                resultado: null,
            });
        }
    } catch (error) {
        // Si ocurrió algún error, lo atrapamos y lo enviamos
        res.status(422).send({
            error: error,
            mensaje:
                error.name === 'CastError'
                    ? 'Id del quehacer incorrecto'
                    : 'Hubo un problema al momento de realizar la actualización',
            resultado: null,
        });
    }
};

// Cambiar el estado del quehacer
exports.cambiarEstadoQuehacer = async (req, res) => {
    // Obtener el id del quehacer
    const { id } = req.params;

    try {
        // Realizar actualización, enviando el filtro del id
        const elQuehacer = await Quehacer.findOneAndUpdate(
            { _id: id },
            [
                {
                    $set: {
                        completado: { $eq: [false, '$completado'] },
                        fechaModificado: new Date(),
                    },
                },
            ],
            {
                new: true,
                runValidators: true,
            }
        );

        // Evaluamos si se realizó la operación
        if (!elQuehacer) {
            // Sino se actualizó, el quehacer no existe
            res.status(404).send({
                error: null,
                mensaje: 'El quehacer no existe.',
                resultado: null,
            });
        } else {
            // Confirmar actualización
            res.status(200).send({
                error: null,
                mensaje: elQuehacer.completado
                    ? 'El Quehacer se completó.'
                    : 'El Quehacer no se ha completado.',
                resultado: null,
            });
        }
    } catch (error) {
        // Si ocurrió algún error, lo atrapamos y lo enviamos
        res.status(422).send({
            error: error,
            mensaje:
                error.name === 'CastError'
                    ? 'Id del quehacer incorrecto'
                    : 'Hubo un problema al momento de realizar la actualización',
            resultado: null,
        });
    }
};

// Eliminar un quehacer
exports.eliminarQuehacer = async (req, res) => {
    // Obtener el id del quehacer
    const { id } = req.params;

    try {
        // Eliminar filtrando por el id
        const elQuehacer = await Quehacer.deleteOne({ _id: id });

        // Evaluamos si se realizó la operación
        if (!elQuehacer || elQuehacer.deletedCount == 0) {
            // Sino se elimina, el quehacer no existe
            res.status(404).send({
                error: null,
                mensaje: 'El quehacer no existe o ya se eliminó.',
                resultado: null,
            });
        } else {
            // Confirmar eliminación
            res.status(200).send({
                error: null,
                mensaje: 'Quehacer eliminado.',
                resultado: null,
            });
        }
    } catch (error) {
        // Si ocurrió algún error, lo atrapamos y lo enviamos
        res.status(422).send({
            error: error,
            mensaje:
                error.name === 'CastError'
                    ? 'Id del quehacer incorrecto'
                    : 'Hubo un problema al momento de eliminar el quehacer',
            resultado: null,
        });
    }
};

// Eliminar quehaceres completados
exports.eliminarQuehaceresCompletados = async (req, res) => {
    try {
        // Eliminar todos los completado == true
        const losQuehaceres = await Quehacer.deleteMany({ completado: true });

        // Evaluamos si se realizó la operación
        if (!losQuehaceres || losQuehaceres.deletedCount == 0) {
            // Sino se elimina, no hay quehaceres completados
            res.status(404).send({
                error: null,
                mensaje: 'No hay quehaceres completados.',
                resultado: null,
            });
        } else {
            // Confirmar eliminación
            res.status(200).send({
                error: null,
                mensaje: `Se eliminaron ${losQuehaceres.deletedCount} quehaceres.`,
                resultado: null,
            });
        }
    } catch (error) {
        // Si ocurrió algún error, lo atrapamos y lo enviamos
        res.status(422).send({
            error: error,
            mensaje: 'Hubo un problema al momento de eliminar los quehaceres.',
            resultado: null,
        });
    }
};

// Eliminar todos los quehaceres
exports.eliminarTodos = async (req, res) => {
    try {
        // Enviar objeto en blanco, para eliminar todos los documentos
        const losQuehaceres = await Quehacer.deleteMany({});

        // Evaluamos si se realizó la operación
        if (!losQuehaceres || losQuehaceres.deletedCount == 0) {
            // Sino se elimina, no hay quehaceres
            res.status(404).send({
                error: null,
                mensaje: 'No hay quehaceres registrados.',
                resultado: null,
            });
        } else {
            // Confirmar eliminación
            res.status(200).send({
                error: null,
                mensaje: 'Se eliminaron todos los quehaceres',
                resultado: null,
            });
        }
    } catch (error) {
        // Si ocurrió algún error, lo atrapamos y lo enviamos
        res.status(422).send({
            error: error,
            mensaje: 'Hubo un problema al momento de eliminar los quehaceres.',
            resultado: null,
        });
    }
};
