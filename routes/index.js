const express = require('express');
const router = express.Router();
const publicIp = require('public-ip');
const SuperAgent = require('./agentservice');

// 天气参数
const url = 'https://free-api.heweather.com/s6/weather/now';
const key = '8594af6f67bc4d2694e481d48e6248a0';

/* GET home page. */
router.get('/', function(req, res, next) {
    publicIp.v4().then(function (ip) {
        SuperAgent.request(url, 'GET', {location:ip,key:key}, 30000,function (err, ret) {
            if (err) {
                console.log(err);
            }
            var result = JSON.parse(ret.text)['HeWeather6'][0];
            console.log(result);
            res.render('index', {
                basic: result.basic,
                update: result.update,
                now: result.now
            });
        })
    });
});

module.exports = router;
