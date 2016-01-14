require.config({
    paths: {
        "jquery": "../vendor/jquery/dist/jquery",
        "underscore": "../vendor/underscore-amd/underscore",
        "backbone": "../vendor/backbone-amd/backbone",
        "socketio": "../socket.io/socket.io",
        "text": "../vendor/requirejs-plugins/lib/text",
        "json": "../vendor/requirejs-plugins/src/json"
    },
    shim: {
        'socketio': {
            exports: 'io'
        }
    }
});

require([
    'jquery',
    'libs/utils',
    'collections/fx-pairs',
    'views/fx-prices',
    'socketio',
    'json!../config.json'
], function($, utils, FxPairCollection, FxPricesView, io, config) {
	var g10Currencies = config.g10Currencies;
	var $table = $("#mytable");

    /*var x = new FxPairCollection();

    var combinations = utils.pairwise(g10Currencies),
        symbols = [];

    for(var i = 0; i < combinations.length; i++) {
        combinations[i] = combinations[i];
        symbols.push(combinations[i][0] + '_' + combinations[i][1]);
        console.log(combinations[i][0] + '/' + combinations[i][1]);
    }

    console.log(combinations.length);

    var collection = new FxPairCollection();
    collection.fetch().done(function(res, b, c) {
        console.log(res);
    });

    var socket = io.connect('/');
    socket.on('news', function(data) {
        var json = JSON.parse(data);
        if(json.tick !== undefined) {
            var row = document.getElementById("mytable").insertRow(-1);
            row.innerHTML = data;
        }
    });*/

	var socket = io.connect('/');
    socket.on('news', function(data) {
        var json = JSON.parse(data);

        var row = $table[0].insertRow(-1);
        row.innerHTML = data.l10;
    });
});