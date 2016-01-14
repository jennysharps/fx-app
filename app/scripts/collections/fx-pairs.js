define([
  'backbone',
  'models/fx-pair',
  'socketio'
], function (Backbone, FxPairModel, io) {
    var collection = {};

    collection.count = 0;

    collection.queryCols = [
        'Ask', 'Bid', 'Change', 'Currency', 'LastTradeDate', 'LastTradeWithTime',
        'LastTradePriceOnly', 'Name', 'Open', 'PreviousClose', 'ChangeinPercent',
        'Symbol', 'LastTradeTime', 'StockExchange', 'PercentChange'
    ];

    collection.url = function() {
        var url = 'https://query.yahooapis.com/v1/public/yql',
            select = 'select ' + this.queryCols.join(', '),
            from = 'from yahoo.finance.quotes',
            where = 'where symbol in (' + this.getCurrencyPairsQueryStr() + ')',
            query = '?q=' + encodeURIComponent([select, from, where].join(' ')),
            additionalParams = '&format=json&env=' + encodeURIComponent('store://datatables.org/alltableswithkeys') + '&callback=';

        return url + query + additionalParams;
    }

    collection.currencies = [];

    collection.model = FxPairModel;

    collection.comparator = 'Name';

    collection.initialize = function(models, options) {
        options || (options = {});

        if(options.currencies) {
            this.currencies = options.currencies;
        };
    };

    collection.parse = function(res) {
        if (_.isObject(res.query) && _.isObject(res.query.results.quote)) {
            return res.query.results.quote;
        } else {
            return res;
        }
    };

    collection.connect = function() {
        this.socket = io.connect('/');
        this.socket.on('quoteUpdate', this.handleDataUpdate.bind(this));
    };

    collection.handleDataUpdate = function(data) {
        var json = JSON.parse(data),
            model = this.get(json.id);

        if(model !== undefined) {
            model.set('Ask', json.Ask);
            model.set('Change', json.Change);
        };
    };

    collection.getCurrencyPairsQueryStr = function() {
        var pairs = [];

        for (var i = 0; i < this.currencies.length; i++) {
            for (var j = 0; j < this.currencies.length; j++) {
                if(j !== i) {
                    pairs.push('"' + this.currencies[i] + this.currencies[j] + '=X"');
                }
            }
        }

        return pairs.join(', ');
    };

    return Backbone.Collection.extend(collection);
});