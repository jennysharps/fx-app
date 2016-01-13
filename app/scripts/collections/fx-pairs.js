define([
  'backbone',
  'models/fx-pair'
], function (Backbone, FxPairModel) {
    var collection = {};

    collection.url = 'http://api-sandbox.oanda.com/v1/prices?instruments=EUR_USD%2CUSD_JPY%2CEUR_CAD';

    collection.model = FxPairModel;

    collection.parse = function(res) {
        if (_.isObject(res.items)) {
            return res.items;
        } else {
            return res;
        }
    };

    /*collection.sync = function(method, collection, options) {
        options.dataType = "jsonp";
        options.data = options.data || {};
        options.data.format = "json";

        return Backbone.sync(method, collection, options);
    };*/

    return Backbone.Collection.extend(collection);
});