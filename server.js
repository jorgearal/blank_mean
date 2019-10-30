// @author Jorge Hernan Arcila Alzate
//  -> Path - Manejo de directorios
//  -> BodyParser - Manejo de los headers y demás atributos de las peticiones HTTP
//  -> Morgan - Logger
var http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

// Configuracion
var config = require('./app/config/config');

// Enrutador para las operaciones publicas
var publicRouter = require('./app/routes/public');

// Seguridad
var helmet = require('helmet');

// Uso los parametros por defecto del helmet
app.use(helmet());

// Activo el morgan dependiendo del ambiente en el que se ejecute este
var logger = morgan(config.dev ? 'dev' : 'prod');

// Desactivo la codificacion de la URL para el bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

http.createServer(function (req, res) {
    var url = req.url;

    if(url.includes('public')) {
        this.publicRouter.process(req, res);
    }

    logger(req, res, function (err) {
        if (err) return done(err)
    })
});