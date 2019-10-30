function getPublic(request, response) {

}

function process(request, response) {
    if(request.url === '/public/' && request.METHOD === 'GET') {
        this.getPublic(request, response);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}

modules.exports = this;