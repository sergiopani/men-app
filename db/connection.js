const mongoose = require('mongoose');
//cargar el fichero .env del fichero raiz
require('dotenv').config({ path: __dirname + '/../../.env' });

//Variables de entorno
const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LOCAL_PORT,
} = process.env;


//url de conexion
const MONGODB_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@10.0.20.2:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}`;
console.log(MONGODB_URL);

console.log(MONGODB_URL);

//Opciones de conexion
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
};


//Conectar a la base de datos
mongoose.connect(MONGODB_URL, options);

//Obtener la conexion
const connection = mongoose.connection;

//Manejo de errores
connection.once('open', () => console.log('Conectado a la base de datos MongoDB!'));

connection.on('error', err => console.log(`Error de conexion: ${err}`));

connection.on('disconnected', () => console.log('Desconectado de la base de datos MongoDB!'));

//Exportar la conexion
module.exports = connection;