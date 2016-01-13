define([
	'backbone'
], function(Backbone) {
	var view = {};

	view.initialize = function() {
		console.log('Photo list view initialized');
	};

	view.template = _.template($("#PhotosViewTemplate").html());

	view.tagName = 'ul';

	view.className = 'media-list';

	view.render = function() {
		/*this.el.innerHTML = this.template(this.collection);
		var ul = this.$('ul');*/
		var self = this;

		this.collection.each(function(model) {
			self.el.innerHTML += self.template(model.toJSON());
		});
		return self;
	};

	return Backbone.View.extend(view);
});