const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quehacerSchema = new Schema({
    tarea: {
        type: String,
        required: [true, 'Ingrese el nombre del quehacer'],
        trim: true,
    },
    completado: {
        type: Boolean,
        required: [true, 'Ingrese si el quehacer está completado o no'],
        default: 'false',
    },
    fechaCreado: {
        type: Date,
        required: [true, 'Ingrese la fecha que se creó el quehacer'],
        default: Date.now,
    },
    fechaModificado: {
        type: Date,
    },
});

module.exports = mongoose.model('Quehacer', quehacerSchema);
