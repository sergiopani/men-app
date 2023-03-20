const { Schema, model } = require('mongoose');

const validarNombre = (name) => {
    if (name.length < 3 && name.length > 20) {
        return false;
    }
    return true;
};

const validarEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
};

//Definir el schema
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],//La controlo en la funcion
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,//La controlo en la funcion
        trim: true,
    },
    date: {
        required: true,
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