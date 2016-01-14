define([
    'backbone'
], function(Backbone) {
    /*global Math */

    var model = {};

    model.defaults = {
        id: null,
        displayOrder: null,
        Ask: null,
        Bid: null,
        Change: null,
        changeKey: null,
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

    };

    model.parse = function(res, options) {
        var attrs = res = res || {};

        attrs.id = res.Symbol !== undefined ? res.Symbol.replace('=X', '') : Math.random();
        attrs.changeKey = res.Change[0] === '-' ? 'negative' : 'positive';

        return attrs;
    };

    return Backbone.Model.extend(model);
});