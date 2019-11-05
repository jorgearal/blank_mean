// @author Jorge Hernan Arcila Alzate
//  -> Express - Manejo de peticiones HTTP
//  -> Morgan - Logger
//  -> Helmet - Seguridad
const express = require('express'),
    morgan = require('morgan'),
    helmet = require('helmet');

// Creo la instancia del objeto express
const app = express();

// Constantes
const ENV = 'dev';

// El objeto HTTP Server que retorna Express
var server;

// Uso los parametros por defecto del helmet
app.use(helmet());

// Activo el morgan dependiendo del ambiente en el que se ejecute este
app.use(morgan(ENV));

// Con esto se reemplaza la configuracion de body-parser
// Body en JSON y parseado como si fueran formularios
express.json();
express.urlencoded({
    extended: true
});

// Configuracion
const config = require('./app/config/config'),
    CORSConfig = require('./app/config/CORS.config');

// Entidades
const CustomError = require('./app/entities/customError');

// Enrutador para las operaciones publicas
const publicRouter = require('./app/controllers/public.controller');

// CORS Middleware
app.use(CORSConfig.CORSMiddleware);

// Uso el controller publico para determinadas operaciones
app.use('/public/', publicRouter);

// Captura el error 404 y lo redirige
app.use((req, res, next) => {
    next(new CustomError(404));
});

// Captura otro tipo de errores, los muestra dependiendo del entorno y los redirige
app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).send(err);
    } else {
        console.error(err.stack);
        res.status(500).send(new CustomError(500, err.message, ENV != 'pdn' ? err.stack : {}));
    }
});

const envConf = config.server[ENV];

server = app.listen(envConf.port, envConf.url, () => {
    console.log(`Server running at http://${envConf.url}:${envConf.port}/`);
});

module.exports = app;