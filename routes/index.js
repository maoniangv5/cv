const express = require('express');
const router = express.Router();
const SuperAgent = require('./agentservice');

// 天气参数
const url = 'https://free-api.heweather.com/s6/weather/now';
const key = '8594af6f67bc4d2694e481d48e6248a0';

/* GET home page. */
router.get('/', function (req, res, next) {

    var ip = req['ip'] == '127.0.0.1' ? 'beijing' : req['ip'];
    ip = "beijing";

    var deviceAgent = req.headers['user-agent'].toLowerCase();
    var page = '';
    if (deviceAgent.indexOf('mobile') > -1) {
        page = 'index-m';
    } else {
        page = 'index';
    }
    SuperAgent.request(url, 'GET', {location: ip, key: key}, 30000, function (err, ret) {
        if (err) {
            console.log(err);
        }
        var result = JSON.parse(ret.text)['HeWeather6'][0];
        res.render(page, {
            basic: result.basic,
            update: result.update,
            now: result.now,
            page: page
        });
    })
});

module.exports = router;
