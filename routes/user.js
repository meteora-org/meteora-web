var express = require('express');
var request = require('superagent');
var async = require('async');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {

    async.parallel([
        function (callback) {
            request('GET', 'http://52.192.132.93:8080/searchUser?findByUserId=' + req.params.id)
                .end(function (err, response) {
                    if (err) {
                        throw err;
                    }
                    console.log(JSON.stringify(response.body));
                    callback(err, response);
                });
        }
    ], function (err, results) {
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(results[0].body.data[0]));
        res.render('../views/user/view', {
            user: results[0].body.data[0]
        });
    });


    //console.log('test');

    //res.render('../views/users/view');
    //res.send('user id ');
});


module.exports = router;
