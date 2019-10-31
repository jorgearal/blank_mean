var  config = {};

// configuracion del servidor de nodejs
config.server = {};

// configuracion para desarrollo
config.server.dev = {
    url: '0.0.0.0',
    port: 8080
};
config.server.dev.fullUrl = config.server.dev.url + ':' + config.server.dev.port;

// configuracion para certificacion
config.server.qa = {
    url: '0.0.0.0',
    port: 6000
};
config.server.qa.fullUrl = config.server.qa.url + ':' + config.server.qa.port;

// configuracion para produccion
config.server.pdn = {
    url: '0.0.0.0',
    port: 6000
};
config.server.pdn.fullUrl = config.server.pdn.url + ':' + config.server.pdn.port;

// configuracion de la bd
config.db = {
    dev: {},
    qa: {},
    pdn: {}
};

/**
 * CONFIGURACION DE DESARROLLO
 * port: 1421 / 1433
 */
config.db.dev.config = { 
    server: 'GEMINIX\\MSSQL16', 
    database: 'SISTEMARASTREO', 
    user: 'rastreo', 
    password: 'RASTREO.INGENEO', 
    port: 1433
};

module.exports = config;