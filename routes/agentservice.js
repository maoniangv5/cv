var superagent =  require('superagent');
var debug = true;

function AgentService() {

}

AgentService.request = function (url, method, data, timeout, callback) {
    if(debug) {
        console.log('调用远程接口:'+url);
        console.log('传参为:'+JSON.stringify(data))
    }
    if(method == 'DELETE') {
        method = 'del';
    }
    if(method == 'GET' || method == 'del') {
        superagent[method.toLowerCase()](url)
            .set('Content-Type', 'application/json')
            .type('form')
            .query(data)
            .timeout(timeout)
            .end(function (err, res) {
                if (err) {
                    callback('当前接口不可用');
                    return console.error(err);
                }
                if(debug) {
                    console.log("Res: ", JSON.stringify(res.body));
                }
                callback(null, res);
            });
    }else {
        superagent[method.toLowerCase()](url)
            .set('Content-Type', 'application/json')
            .type('form')
            .send(data)
            .timeout(timeout)
            .end(function (err, res) {
                if (err) {
                    callback('当前接口不可用');
                    return console.error(err);
                }
                if(debug) {
                    if(res.header['content-type'].indexOf('text/html') !== -1) {
                        console.log("Res: ", JSON.stringify(res.text));
                    } else {
                        console.log("Res: ", JSON.stringify(res.body));
                    }
                }
                callback(null, res);
            });
    }
};

module.exports = AgentService;