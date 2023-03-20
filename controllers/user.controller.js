//Importar el usuario
//Requerrir bcrypt
const bcrypt = require('bcrypt');
const { connection } = require('mongoose');
const User = require('../db/models/user.schema');


/**
 * Objeto donde guardo todas las acciones que 
 * voy a hacer con los usuarios
 */
const userManager = {};

/**
 * !TODO
 * -> Hacer login compobando que el usuario
 * existe 
 * -> Hacer el hash del passowrd
 * -> Enviar el JWT al usuario 
 */


userManager.users = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

userManager.loginUser = async (req, res) => {
    try {
        //1 -> Comprobar que el usuario existe en la base de datos
        const email = req.body.email;
        const password = req.body.password;
        const userBD = await User.find({ email: email });
        if ((userBD.length === 0)) {
            throw new Error('El usuario con esas credenciales no existe!');
        }

        // 2 -> Comprobar que la contraseña es correcta con bcrypt
        if (!await bcrypt.compare(password, userBD[0].password)) {
            throw new Error('La contraseña no es correcta');
        }

        return res.status(200).json({
            "message": "Login correcto"
        });

        //PRUEBAS CON JWT NO SE EJECUTA
        /**
         * Si estamos aqui es que se ha podido verficar
         * que existe el usuario asi que vamos ha devolverle
         * el JWT
         */
        const token = jwt.sign({
            email: email,
            password: password
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            "message": "Login correcto",
            "token": token
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

};


userManager.registerUser = async (req, res) => {
    try {
        console.log('Registrando usuario');

        //1 -> Guardar en una constante lo que viene por post
        const body = req.body;

        /**
         * Validamos la contraseña con una expresion regular
         */
        if (!body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
            throw new Error('La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero');
        }

        const user = new User(body);

        //Si el email ya existe en la base de datos
        const existe = await User.find({ email: body.email });

        if (existe.length > 0) {
            throw new Error('El email ya existe');
        }

        /**
         * Encriptamos la contraseña antes de gudardarla
         * Param1 -> contraseña
         * Param2 -> Numero de vueltas que se le da al algoritmo
         * Param3 -> Callback 
         * 
         */
        await bcrypt.hash(body.password, 10).then((hash) => {
            user.password = hash;
        });

        //3 -> Guardar los datos con el metodo save
        await user.save();

        return res.status(200).json({
            "message": "Usuario registrado correctamente!"
        });


    } catch (err) {
        res.status(409).json({ error: err.message });

    }
};


userManager.deleteUser = async (req, res) => {
    res.send('Eliminando el usuario');
};


module.exports = {
    userManager
};