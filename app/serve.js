var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    expressLess = require('express-less');

app.set('port', process.env.PORT || 3000);

app.use('/css', expressLess(__dirname + '/css/less', {
    debug: app.get('env') === 'development'
}));

if(app.get('env') == 'development') {
    app.use(express.static('app'));
} else {
    app.use(express.static('dist'));
}

console.log("Express server listening on port " + app.get('port'));

io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});

require('./yahoo-streamer')(io);
