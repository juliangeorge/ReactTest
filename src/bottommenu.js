/** @jsx React.DOM */

var BottomMenu = React.createClass({
  submitClicked: function() {
    this.props.submit();
  },

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
      	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<button class="navbar-text navbar-right" onClick={this.submitClicked}>Send all concerns</button>
      	</div>
      </nav>
    );
  }
});