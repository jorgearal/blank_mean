var  config = {};

// bandera del modo de desarrollo
config.dev = true;

// configuracion del servidor de nodejs
config.server = {};

// configuracion para produccion
config.server.prod = {};

// configuracion para desarrollo
config.server.dev = {
    url: 'http://localhost',
    port: 6000,
    fullUrl: config.server.dev.url + ':' + config.server.dev.port 
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