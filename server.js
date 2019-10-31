// @author Jorge Hernan Arcila Alzate
//  -> Express - Manejo de peticiones HTTP
//  -> Morgan - Logger
//  -> Helmet - Seguridad
const express = express()
    morgan = require('morgan'),
    helmet = require('helmet');

// Creo la instancia del objeto express
const app = express();

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

// Constantes
const ENV = 'dev';

// Configuracion
const config = require('./app/config/config'),
    CORSConfig = require('./app/config/CORS.config');

// Entidades
const CustomError = require('./app/entities/customError');

// Enrutador para las operaciones publicas
const publicRouter = require('./app/controllers/public.controller');

// CORS Middleware
app.use(CORSConfig.CORSMiddleware);

///////////////////////////////////////////////////////////////////

var manageErrors = (err, res) => {
    res.writeHead(err.status, {'Content-Type': 'application/json'});

    if(err.message) {
        res.write(JSON.stringify(err.message));
    }
    
    res.end();
};

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.path.includes('public')) {
        publicRouter.process(req, res, manageErrors);
    } else {
        manageErrors(new CustomError(404), res);
    }

    logger(req, res, function (err) {
        if (err) return done(err)
    })
});

const envConf = config.server[ENV];

server.listen(envConf.port, envConf.url, () => {
    console.log(`Server running at http://${envConf.url}:${envConf.port}/`);
});