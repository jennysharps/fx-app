var fs = require('fs');
var last;
var tick;
var io;
var symbols = ['EUR_GBP'];
var instruments = ['EUR_GBP'];

module.exports = function(server) {
    var io = require('socket.io')(server);

    io.sockets.on('connection', function(socket) {
      console.log(typeof socket.handshake.query.symbols);
        instruments = JSON.parse(socket.handshake.query.symbols).join('%2');

        console.log(instruments);

        setInterval(function() {
            if(bodyChunk !== last) {
                socket.emit('news', bodyChunk);
                last = bodyChunk;
            }
        }, 0.001);
    });

    io.use(function(socket, next) {
        var handshakeData = socket.request;
        console.log("middleware:", handshakeData._query['symbols']);
        next();
    });

    /*
    Environment           <Domain>
    fxTrade               stream-fxtrade.oanda.com
    fxTrade Practice      stream-fxpractice.oanda.com
    sandbox               stream-sandbox.oanda.com
    */

    // Replace the following variables with your personal ones
    var domain = 'stream-fxpractice.oanda.com'
    var access_token = '8b9699ef245d6ee74e208dcc96586634-d2e812ff05296370b662c5b6b4b5d4ea'
    var account_id = '9386135'
    // Up to 10 instruments, separated by URL-encoded comma (%2C)

    /*var b = a.splice(0,10);
    var groupNum = 1;
    for(var i = 0; i < symbols.length; i++) {
    }*/

    var https;

    if (domain.indexOf("stream-sandbox") > -1) {
      https = require('http');
    } else {
      https = require('https');
    }

    var options = {
      host: domain,
      path: '/v1/prices?accountId=' + account_id + '&instruments=' + instruments,
      method: 'GET',
      headers: {"Authorization" : "Bearer " + access_token},
    };

    var request = https.request(options, function(response){
          response.on("data", function(chunk){
             bodyChunk = chunk.toString();
          });
          
          response.on("end", function(chunk){
             console.log("Error connecting to OANDA HTTP Rates Server");
             console.log("HTTP - " + response.statusCode);
             console.log(bodyChunk);
             process.exit(1);
          });
    });

    request.end();

    function handler (req, res) {
      fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
      });
    };
}