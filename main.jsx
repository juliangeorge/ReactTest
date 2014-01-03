/** @jsx React.DOM */

//var Zepto = require('Zepto');
//var Backbone = require('Backbone');
var React = require('react/addons');
var Workshop = require('./Workshop');

Backbone.$ = Zepto;

var App = Backbone.Router.extend({
  routes: {
    "": "home",
    "create": "create"
  }
});

var app = new App();

app.on('route', function(page) {
  React.renderComponent(
	<Workshop />,
	document.getElementById('main')
  );
})

Backbone.history.start();