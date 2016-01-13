define([
    'backbone'
], function(Backbone) {
    var model = {};

    model.defaults = {
        id: null
    };

    model.initialize = function(attrs, options) {
        console.log('Model initialized');
    };

    model.parse = function(res, options) {
        var attrs = {};
        res = res || {};

        attrs.id = res.id;

        return attrs;
    };

    model.validate = function(attrs, options) {

    };

    return Backbone.Model.extend(model);
});