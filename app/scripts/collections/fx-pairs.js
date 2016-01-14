define([
  'backbone',
  'models/fx-pair'
], function (Backbone, FxPairModel) {
    var collection = {};

    collection.queryCols = [
        'Ask', 'Bid', 'Change', 'Currency', 'LastTradeDate', 'LastTradeWithTime',
        'LastTradePriceOnly', 'Name', 'Open', 'PreviousClose', 'ChangeinPercent',
        'Symbol', 'LastTradeTime', 'StockExchange', 'PercentChange'
    ];


/*https://query.yahooapis.com/v1/public/yql?q=select%20Ask,%20Bid,%20Change,%20Currency,
%20LastTradeDate,%20LastTradeWithTime,%20LastTradePriceOnly,%20Name,%20Open,%20PreviousClose,
%20ChangeinPercent,%20Symbol,%20LastTradeTime,%20StockExchange,%20PercentChange%20from%20
yahoo.finance.quotes%20where%2520symbol%2520in%2520()&format=jsone&env=
store://datatables.org/alltableswithkeys&callback=*/
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