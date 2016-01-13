require.config({
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone",
		"socketio": "../socket.io/socket.io"
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
	'socketio'
], function($, utils, FxPairCollection, FxPricesView, io) {
	var x = new FxPairCollection();

	var g10Currencies = [
		'USD', 'EUR', 'JPY', 'GBP', 'CHF',
		'AUD', 'NZD', 'CAD', 'SEK', 'NOK' 
	];

	var combinations = utils.pairwise(g10Currencies),
		symbols = [];

	for(var i = 0; i < combinations.length; i++) {
		symbols.push(combinations[i][0] + '_' + combinations[i][1]);
		console.log(combinations[i][0] + '/' + combinations[i][1]);
	}

	console.log(combinations.length);

	var collection = new FxPairCollection();
	collection.fetch().done(function(res, b, c) {
		console.log(res);
	});

	var socket = io.connect('/', {query: 'symbols=' + JSON.stringify(symbols)});
	socket.on('news', function(data) {
		var json = JSON.parse(data);
		if(json.tick !== undefined) {
			var row = document.getElementById("mytable").insertRow(-1);
			row.innerHTML = data;
		}
	});
});