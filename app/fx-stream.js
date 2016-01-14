//the most simple http client: 
//http://nodejs.org/api.html#http-client-183

//dependencies
var http = require('http'), //http module
    sys = require('util'),
    config = require('./config'),
    last, bodyChunk;

var currencies = config.currencies;

function onConnect(socket) {
    openStream();

    setInterval(function() {
        if(bodyChunk !== last) {
            var data = JSON.parse(bodyChunk);

            for(var symbol in data) break;

            if(data[symbol].l10 !== undefined) {
                var returnData = {
                    'id': symbol,
                    'Ask': data[symbol].l10,
                    'Change': data[symbol].c10
                }

                socket.emit('quoteUpdate', JSON.stringify(returnData));
                last = bodyChunk;
            }
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
                var data = match[1].replace(/=X/, '').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^\/])/g, '"$2":$4');
                bodyChunk = data;
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

    for (var i = 0; i < currencies.length; i++) {
        for (var j = 0; j < currencies.length; j++) {
            if(j !== i) {
                pairs += (i + j === 0) ? '' : ',';
                pairs += currencies[i] + currencies[j] + '=X';
            }
        }
    }

    return pairs;
};

module.exports = function(io) {
    io.sockets.on('connection', onConnect);
};