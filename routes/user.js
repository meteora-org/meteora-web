var express = require('express');
var request = require('superagent');
var async = require('async');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id(\\d+)', function (req, res, next) {

    async.series([
        function (callback) {
					request('GET', 'http://52.192.132.93:8080/searchUser?findByUserId=' + res.userId)
					.end(function (err, response) {
						if (err) {
							throw err;
						}
						callback(err, response);
					});
        }
    ], function (err, results) {
        if (err) {
            throw err;
        }

        // console.log(results);

        res.render('../views/user/view', {
            title: 'movie list',
            movies: results[0].body
        });
    });

    res.send('user id ');
});


module.exports = router;
