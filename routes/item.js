var express = require('express');
var request = require('superagent');
var async = require('async');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id(\\d+)', function (req, res, next) {
	res.render('../views/item/view', {
		title: '商品1',
		// movie: results[0].body
	});
});


module.exports = router;
