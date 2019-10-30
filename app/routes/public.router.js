const url = require('url');

exports.getPublic = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();
}

exports.process = (req, res) => {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.path === '/public' && req.method === 'GET') {
        this.getPublic(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}