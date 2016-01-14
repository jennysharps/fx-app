define([
    'backbone'
], function(Backbone) {
    /*global Math */

    var model = {};

    model.defaults = {
        id: null,
        Ask: null,
        Bid: null,
        Change: null,
        Currency: null,
        LastTradeDate: null,
        LastTradeWithTime: null,
        LastTradePriceOnly: null,
        Name: null,
        Open: null,
        PreviousClose: null,
        ChangeinPercent: null,
        Symbol: null,
        LastTradeTime: null,
        StockExchange: null,
        PercentChange: null
    };

    model.initialize = function(attrs, options) {
        console.log('Model initialized');
    };

    model.parse = function(res, options) {
        var attrs = res = res || {};

        attrs.id = res.Symbol !== undefined ? res.Symbol.replace('=X', '') : Math.random();

        return attrs;
    };

    model.validate = function(attrs, options) {

    };

    return Backbone.Model.extend(model);
});