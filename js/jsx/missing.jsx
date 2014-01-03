/** @jsx React.DOM */
var React = require('react/addons');

var Missing = React.createClass({
	render: function() {
		return (
      		<div className="my-fluid-container">
  				<div className="row">
  					<div className="jumbotron">
  						<h1>Page not found!</h1>
  					</div>
  				</div>
  			</div>
		);
	}
});

module.exports = Missing;