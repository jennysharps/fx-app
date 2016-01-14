define([
    'backbone'
], function(Backbone) {
    var view = {};

    view.initialize = function() {
        this.listenTo(this.model, 'change:Ask', this.update);
    };

    view.template = _.template($("#FxPairView").html());

    view.tagName = 'tr';

    view.className = 'transition';

    view.render = function() {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    };

    view.update = function() {
        this.render();
        var rowClass = this.model.get('changeKey') === 'positive' ? 'success' : 'danger';
        this.$el.addClass(rowClass);
        setTimeout(this.clearRowClass.bind(this), 1500);

        return this;
    };

    view.clearRowClass = function() {
        this.$el.removeClass('success danger');
    };

    return Backbone.View.extend(view);
});