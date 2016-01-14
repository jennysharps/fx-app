define([
    'backbone',
    'views/fx-pair'
], function(Backbone, itemView) {
    var view = {};

    view.initialize = function() {

    };

    view.template = _.template($("#FxPairsView").html());

    view.className = 'media-list';

    view.events = {
        'click .sortable': 'sort'
    };

    view.children = {};

    view.render = function() {
        this.el.innerHTML = this.template();

        this.collection.each(function(model, i) {
            model.set('displayOrder', i + 1);
            this.addItem(model);
        }, this);
        return this;
    };

    view.addItem = function(model) {
        this.children[model.id] = new itemView({model: model});
        this.$('table').append(this.children[model.id].render().el);
    };

    view.sort = function(evt) {
        var sortType;
        if(sortType = evt.target.getAttribute('data-sort-type')) {
            this.collection.comparator = sortType;
            this.collection.sort();
        }
        this.render().el;
    };

    return Backbone.View.extend(view);
});