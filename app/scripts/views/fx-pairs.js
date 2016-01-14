define([
	'backbone',
	'views/fx-pair'
], function(Backbone, itemView) {
	var view = {};

	view.initialize = function() {
		console.log('Fx table view initialized');
	};

	view.template = _.template($("#FxPairsView").html());

	view.className = 'media-list';

	view.render = function() {
		this.el.innerHTML = this.template();
		var table  = this.$('table');

		this.collection.each(function(model) {
			var fxPairView = new itemView({model: model});
			table.append(fxPairView.render().el);
		});
		return this;
	};

	return Backbone.View.extend(view);
});