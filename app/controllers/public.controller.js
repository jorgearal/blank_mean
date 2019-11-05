var express = require('express');
var router = express.Router();

/* El Index mostrara el estado de la aplicacion */
router.get('/', function (req, res) {
    res.send({
        message: 'OK'
    });
});

module.exports = router;