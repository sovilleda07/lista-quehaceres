const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quehacerSchema = new Schema({
    tarea: {
        type: String,
        required: true,
        trim: true,
    },
    completado: {
        type: Boolean,
        required: true,
        default: 'false',
    },
    fechaCreado: {
        type: Date,
        required: true,
        default: Date.now,
    },
    fechaModificado: {
        type: Date,
    },
});

module.exports = mongoose.model('Quehacer', quehacerSchema);
