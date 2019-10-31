// @author Jorge Hernan Arcila Alzate
//  -> Http - Manejo nativo de peticiones HTTP
//  -> Url - Middleware para manejar la URL de los request
//  -> Morgan - Logger
const http = require('http'),
    url = require('url'),
    morgan = require('morgan');

var CustomError = require('./app/entities/customError');

const ENV = 'dev';

// Configuracion
const config = require('./app/config/config');

// Enrutador para las operaciones publicas
const publicRouter = require('./app/controllers/public.controller');

// Activo el morgan dependiendo del ambiente en el que se ejecute este
const logger = morgan(ENV);

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