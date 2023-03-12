const { Schema, model } = require('mongoose');

//Definir el schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

/**
 * 1 -> nombre  
 * 2 -> schema
 * 3 -> nombre de la coleccion
 */
module.exports = model('User', userSchema, 'user');