# Practica Mongo DB con Express

## Instalación

- Primero me he encargado de instalar el docker y docker-compose en mi máquina.
  
```bash
sudo apt-get install docker.io
sudo apt-get install docker-compose
```

He creado como decía el PDF los archivos de configuración de docker-compose.yml y Dockerfile

Después me he puesto a instalar, portainer, postman y mongo-compass


Imagen de como me han quedado los dos containers instalados:

![Containers](./img/containers.png)

- Una vez tengo el docker, me he puesto a programar con Javascript y Express todo lo que me pedía el PDF. 
A la vez que lo programaba he ido probando con postman y mongo-compass para ver si me funcionaba correctamente.


Aqui el resultado de mis primeras pruebas con postman:

![Postman](./img/postmanDelete.png)


- Ahora he intentado la conexción con mongo y me ha funcionado para ello he preparado esta cadena
```bash
//cargar el fichero .env del fichero raiz
require('dotenv').config({ path: __dirname + '/../../.env' });

//Variables de entorno
const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LOCAL_PORT,
    MONGODB_DOCKER_PORT,
    NODE_LOCAL_PORT,
    NODE_DOCKER_PORT } = process.env;


//url de conexion
const MONGODB_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}`;
```



Como vemos la conexión es correcta:

![Mongo](./img/mongo.png)



Ahora es momento de probar con postman y mongo-compass el post de un nuevo usuario
![Postman](./img/usuario.png)




