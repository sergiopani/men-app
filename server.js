const express = require('express');
const app = express();
const cors = require('cors');
const port = '9000';


//importar el archivo de user.controller
require('./db/connection');
const { userManager } = require('./controllers/user.controller');


app.use(cors());
app.use(express.json());


/**
 * GET
 * -> Accedo a la que tengo en el objeto userManager
 */
app.get('/users', userManager.users);

/**
 * Post 
 */
app.post('/users/register', userManager.registerUser);
app.post('/users/login', userManager.loginUser);

/**
 * Delete
 */
app.delete('/', userManager.deleteUser);



app.listen(port, () => {
    console.log(`El server se encuentra corriendo en el puerto ${port}`);
});
