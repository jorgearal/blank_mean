// @author Jorge Hernan Arcila Alzate
//  -> Path - Manejo de directorios
//  -> BodyParser - Manejo de los headers y demás atributos de las peticiones HTTP
//  -> Morgan - Logger
const http = require('http'),
    url = require('url'),
    morgan = require('morgan');

const ENV = 'dev';

// Configuracion
const config = require('./app/config/config');

// Enrutador para las operaciones publicas
const publicRouter = require('./app/routes/public.router');

// Activo el morgan dependiendo del ambiente en el que se ejecute este
const logger = morgan(ENV);

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    
    if(reqUrl.path.includes('public')) {
        publicRouter.process(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }

    logger(req, res, function (err) {
        if (err) return done(err)
    })
});

const envConf = config.server[ENV];

server.listen(envConf.port, envConf.url, () => {
    console.log(`Server running at http://${envConf.url}:${envConf.port}/`);
});