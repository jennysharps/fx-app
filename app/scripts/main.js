require.config({
    paths: {
        jquery: "../vendor/jquery/dist/jquery",
        underscore: "../vendor/underscore-amd/underscore",
        backbone: "../vendor/backbone-amd/backbone",
        socketio: "../socket.io/socket.io",
        text: "../vendor/requirejs-plugins/lib/text",
        json: "../vendor/requirejs-plugins/src/json",
    },
    shim: {
        socketio: {
            exports: 'io'
        }
    }
});

require([
    'jquery',
    'libs/utils',
    'libs/config',
    'collections/fx-pairs',
    'views/fx-pairs',
    'socketio',
], function($, utils, siteConfig, FxPairCollection, FxCollectionView, io) {
    var g10Currencies = siteConfig.currencies;
    var $table = $("#mytable");
    var $main = $('#main');

    var g10PairsCollection = new FxPairCollection([], {currencies: siteConfig.currencies});
    
    g10PairsCollection.fetch().done(function(res) {
        var fxPricesView = new FxCollectionView({collection: g10PairsCollection});
        $main.append(fxPricesView.render().el)
        g10PairsCollection.connect();
    });

    window.collection = g10PairsCollection;
});