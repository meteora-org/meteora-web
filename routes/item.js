var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id(\\d+)', function (req, res, next) {
    res.render('../views/item/view');
    res.send('item id ');
});


module.exports = router;
