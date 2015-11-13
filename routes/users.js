var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id(\\d+)', function (req, res, next) {
    res.render('../views/users/view');
    res.send('user id ');
});


module.exports = router;
