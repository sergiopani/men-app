//Importar el usuario
// const { default: mongoose } = require('mongoose');
const User = require('../db/models/user.schema');


/**
 * Objeto donde guardo todas las acciones que 
 * voy a hacer con los usuarios
 */
const userManager = {};


userManager.users = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


userManager.registerUser = async (req, res) => {
    try {
        console.log('Registrando usuario');

        //1 -> Guardar en una constante lo que viene por post
        const body = req.body;

        //2 -> Crear una instancia del modelo con los datos que vienen por post
        const user = new User(body);

        console.log(JSON.stringify(user));

        //3 -> Guardar los datos con el metodo save
        user.save().then((user) => {
            return res.status(200).json({
                "message": "Usuario registrado correctamente!"
            });
        }).catch((err) => {
            return res.status(400).json({
                "message": "Error al registrar el usuario",
                "error": err.message
            });
        });


    } catch (err) {
        res.status(400).json({ error: err.message });

    }
};


userManager.deleteUser = async (req, res) => {
    res.send('Eliminando el usuario');
};


module.exports = {
    userManager
};