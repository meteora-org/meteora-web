var express = require('express');
var request = require('superagent');
var async = require('async');
var router = express.Router();

router.get('/', function (req, res, next) {
    async.series([
        function (callback) {
            request('GET', 'http://52.192.150.36:8081/movie/')
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
        res.render('movie/list', {
            title: 'movie list',
            movies: results[0].body
        });
    });
});

router.get('/:id(\\d+)', function (req, res, next) {
    async.series([
        function (callback) {
            request('GET', 'http://52.192.150.36:8081/movie/' + req.params.id)
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
        res.render('movie/view', {
            title: 'movie view',
            movie: results[0].body
        });
    });
});

router.get('/:id(\\d+)/edit', function (req, res, next) {
    async.series([
        function (callback) {
            request('GET', 'http://52.192.150.36:8081/movie/' + req.params.id)
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
        res.render('movie/edit', {
            title: 'movie edit',
            movie: results[0].body
        });
    });
});

router.get('/new', function (req, res, next) {
    res.render('movie/edit', {
        title: 'movie edit',
        movie: {}
    });
});

router.post('/:id(\\d+)/save', function (req, res, next) {
    console.log("save" + JSON.stringify(req.body));
    res.redirect('/movie/' + req.body.id);
});

router.post('/:id(\\d+)/save', function (req, res, next) {
    console.log("save" + JSON.stringify(req.body));
    res.redirect('/movie/' + req.body.id);
});

router.post('/save', function (req, res, next) {
    console.log("save" + JSON.stringify(req.body));
    res.redirect('/movie/1');
});

module.exports = router;
