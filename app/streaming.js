var fs = require('fs');
var request = require('request');

/* Demo API throws errors since not allowed access to data for all currency pairs;
   requires paid account */
/*var instrumentsArray = [
    ["USD","EUR"], ["USD","JPY"], ["USD","GBP"], ["USD","CHF"], ["USD","AUD"], 
    ["USD","NZD"], ["USD","CAD"], ["USD","SEK"], ["USD","NOK"], ["EUR","JPY"],
    ["EUR","GBP"], ["EUR","CHF"], ["EUR","AUD"], ["EUR","NZD"], ["EUR","CAD"],
    ["EUR","SEK"], ["EUR","NOK"], ["JPY","GBP"], ["JPY","CHF"], ["JPY","AUD"],

    ["JPY","NZD"], ["JPY","CAD"], ["JPY","SEK"], ["JPY","NOK"], ["GBP","CHF"],
    ["GBP","AUD"], ["GBP","NZD"], ["GBP","CAD"], ["GBP","SEK"], ["GBP","NOK"],
    ["CHF","AUD"], ["CHF","NZD"], ["CHF","CAD"], ["CHF","SEK"], ["CHF","NOK"],

    ["AUD","NZD"], ["AUD","CAD"], ["AUD","SEK"], ["AUD","NOK"], ["NZD","CAD"],
    ["NZD","SEK"], ["NZD","NOK"], ["CAD","SEK"], ["CAD","NOK"], ["SEK","NOK"]
];*/

var availableInstrumentGroups = [
    ['EUR_USD', 'USD_JPY','GBP_USD', 'USD_CHF', 'AUD_USD', 'NZD_USD', 'USD_CAD', 'USD_SEK', 'USD_NOK', 'EUR_JPY'],
    ['EUR_GBP', 'EUR_CHF', 'EUR_AUD', 'EUR_NZD', 'EUR_CAD', 'EUR_SEK', 'EUR_NOK', 'GBP_JPY', 'CHF_JPY', 'AUD_JPY'],
    ['NZD_JPY', 'CAD_JPY', 'GBP_CHF', 'GBP_AUD', 'GBP_NZD', 'GBP_CAD', 'AUD_NZD', 'AUD_CAD', 'NZD_CAD']
];

var allowedInstruments = {};

module.exports = function(server) {
    var io = require('socket.io').listen(server),
        last, tick, bodyChunk;

    /*
    Environment           <Domain>
    fxTrade               stream-fxtrade.oanda.com
    fxTrade Practice      stream-fxpractice.oanda.com
    sandbox               stream-sandbox.oanda.com
    */
    var domain = 'stream-fxpractice.oanda.com'
    var access_token = '8b9699ef245d6ee74e208dcc96586634-d2e812ff05296370b662c5b6b4b5d4ea'
    var account_id = '9386135'
    var instruments = "EUR_USD%2CUSD_CAD"

    var https;

    if (domain.indexOf("stream-sandbox") > -1) {
        https = require('http');
    } else {
        https = require('https');
    }

    function StreamOptions(instruments) {
        instruments = instruments || [];
        this.host = domain;
        this.path = '/v1/prices?accountId=' + account_id + '&instruments=' + instruments.join('%2C');
        this.method = 'GET';
        this.headers = {"Authorization" : "Bearer " + access_token};
    };

    for(var i = 0; i < availableInstrumentGroups.length; i++) {
        var request = https.request(new StreamOptions(availableInstrumentGroups[i]), function(response) {
            response.on("data", function(chunk) {
                bodyChunk = chunk.toString();
            });
          
            response.on("end", function(chunk){
                console.log("Error connecting to OANDA HTTP Rates Server");
                console.log("HTTP - " + response.statusCode);
                console.log(bodyChunk);
                //process.exit(1);
            });
        });

        request.end();
    }

    io.sockets.on('connection', function (socket) {
        setInterval(function(){
            if(bodyChunk !== last) {
                socket.emit('news', bodyChunk);
                last = bodyChunk;
            }
        }, 0.005);
    });
}