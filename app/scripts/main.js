require.config({
    paths: {
        jquery: "../vendor/jquery/dist/jquery",
        underscore: "../vendor/underscore-amd/underscore",
        backbone: "../vendor/backbone-amd/backbone",
        socketio: "../socket.io/socket.io",
        text: "../vendor/requirejs-plugins/lib/text",
        json: "../vendor/requirejs-plugins/src/json",
        q: "../vendor/q/q"
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
    'views/fx-pairs'
], function($, utils, siteConfig, FxPairCollection, FxCollectionView) {
    var $main = $('#main');

    var g10PairsCollection = new FxPairCollection([], {currencies: siteConfig.currencies});
    
    g10PairsCollection.fetch().done(function(res) {
        var fxPricesView = new FxCollectionView({collection: g10PairsCollection});
        $main.append(fxPricesView.render().el)
        g10PairsCollection.connect();
    });
});