var express = require('express');
var request = require('superagent');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    request('GET', 'https://api.github.com/').end(function (err, response) {
        console.log('github res: ' + JSON.stringify(response.body) + ' err: ' + err);
        res.render('index', {
            title: 'Example',
            data: {
                '佐々木': 'sasaki_kohey@cyberagent.co.jp',
                '山田': 'yamada_gakuto@cyberagent.co.jp',
                '田中': 'tanaka_makoto@cyberagent.co.jp'
            },
            github: response.body
        });
    });
});

module.exports = router;
