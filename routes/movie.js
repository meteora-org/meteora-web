var express = require('express');
var request = require('superagent');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    request('GET', 'http://52.192.150.36:8081/movie/').end(function (err, response) {
        console.log('movie res: ' + JSON.stringify(response.body) + ' err: ' + err);
        res.render('movie/list', {
            title: 'Movie List',
            movies: response.body
        });
    });
});
router.get('/:id', function (req, res, next) {
    request('GET', 'http://52.192.150.36:8081/movie/' + req.params.id).end(function (err, response) {
        console.log('movie/:id res: ' + JSON.stringify(response.body) + ' err: ' + err);
        res.render('movie/view', {
            title: 'Movie View',
            movie: response.body
        });
    });
});

module.exports = router;
