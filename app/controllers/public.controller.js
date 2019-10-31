var CustomError = require('../entities/customError');

const url = require('url');

exports.getPublic = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({
        message: 'OK'
    }));
    res.end();
}

exports.process = (req, res, callback) => {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.path === '/public' && req.method === 'GET') {
        this.getPublic(req, res);
    } else {
        callback(new CustomError(404), res);
    }
}