// CORS Middleware
exports.CORSMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  
    // Intercepto el metodo OPTIONS
    // CORS Preflight
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
};