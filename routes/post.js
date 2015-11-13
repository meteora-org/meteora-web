var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id(\\d+)', function (req, res, next) {
	console.log("post page response" + res);

  res.render('../views/post/view');
});

module.exports = router;
