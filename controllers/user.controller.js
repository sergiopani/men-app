//Importar el usuario
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
        const savedUser = await user.save();

        // 4 -> No se ha creado correctamente
        if (!savedUser) {
            return res.status(400).json({
                "message": "No se ha podido registrar el usuario"
            });
        }

        //5 -> Se ha creado correctamente
        return res.status(200).json({
            "message": "Usuario registrado correctamente!"
        });


    } catch (err) {

        res.status(500).json({ error: 'Error interno del servidor' });

    }
};


userManager.deleteUser = async (req, res) => {
    res.send('Eliminando el usuario');
};


module.exports = {
    userManager
};