var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var expressLess = require('express-less');
var oanda = require('node-oanda');
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

app.use('/css', expressLess(__dirname + '/css/less', {
    debug: app.get('env') === 'development'
}));

if(app.get('env') == 'development') {
    app.use(express.static('app'));
} else {
    app.use(express.static('dist'));
}

require('./streaming.js')(server);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});