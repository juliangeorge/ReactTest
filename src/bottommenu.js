/** @jsx React.DOM */

var BottomMenu = React.createClass({
  submitClicked: function() {
    this.props.submit();
  },

  closeWindow: function() {
    window.open('','_self'):
    window.close();
  },

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <ul className="nav navbar-nav navbar-right">
          <li className="close"><button className="close" onClick={this.closeWindow}>Close</button></li>
          <li className="lastItem send"><button className="send" onClick={this.submitClicked}>Send all Concerns</button></li>
        </ul>
      </nav>
    );
  }
});