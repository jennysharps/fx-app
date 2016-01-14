define([
	'backbone'
], function(Backbone) {
	var view = {};

	view.el = '#main';

	view.initialize = function() {
		console.log('View initialized');
	};

	return Backbone.View.extend(view);
});