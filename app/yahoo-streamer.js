//the most simple http client: 
//http://nodejs.org/api.html#http-client-183

//dependencies
var http = require('http'), //http module
    sys = require('util'),
    config = require('./config'),
    last, bodyChunk;

var g10Currencies = config.g10Currencies;

function onConnect(socket) {
    openStream();

    setInterval(function() {
        console.log(last);
        if(bodyChunk !== last) {
            socket.emit('news', bodyChunk);
            last = bodyChunk;
        }
    }, 0.005);
}

function openStream() {
    return http.request({
        port: 80,
        host: 'streamerapi.finance.yahoo.com',
        method: 'GET',
        path: "/streamer/1.0?s=" + getCurrencyPairsStr() + "&k=a00,a50,b00,b60,c10,g00,h00,j10,l10,p20,t10,v00,z08,z09&j=c10,j10,l10,p20,t10,v00&r=0&marketid=us_market&callback=parent.yfs_u1f&mktmcb=parent.yfs_mktmcb&gencallback=parent.yfs_gencb",
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
            'Keep-Alive': '115',
            'Connection': 'keep-alive',
            'Referer': 'http://finance.yahoo.com/q?s=aapl'
        }
    }, function(response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            var match = /yfs_u1f\(([^\)]+)\)/.exec(chunk);

            if(match && typeof match === 'object' && match[1] !== undefined) {
                console.log('BODY: ' + match[1]);
                bodyChunk = JSON.stringify(match[1]);
            }
        });

        response.on("end", function(chunk) {
            console.log("Error connecting to Rates Server");
            console.log("HTTP - " + response.statusCode);
            console.log(chunk);
            process.exit(1);
        });
    }).end();
};

function getCurrencyPairsStr() {
    var pairs = '';

    for (var i = 0; i < g10Currencies.length; i++) {
        for (var j = 0; j < g10Currencies.length; j++) {
            if(j !== i) {
                pairs += (i + j === 0) ? '' : ',';
                pairs += g10Currencies[i] + g10Currencies[j] + '=X';
            }
        }
    }

    return pairs;
};

module.exports = function(io) {
    io.sockets.on('connection', onConnect);
};