/** @jsx React.DOM */

var BottomMenu = React.createClass({displayName: 'BottomMenu',
  submitClicked: function() {
    this.props.submit();
  },

  render: function() {
    return (
      React.DOM.nav( {className:"navbar navbar-default navbar-fixed-bottom", role:"navigation"}, 
      	React.DOM.div( {class:"collapse navbar-collapse", id:"bs-example-navbar-collapse-1"}, 
      		React.DOM.button( {class:"navbar-text navbar-right", onClick:this.submitClicked}, "Send all concerns")
      	)
      )
    );
  }
});