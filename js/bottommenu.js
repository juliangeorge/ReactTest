/** @jsx React.DOM */

var BottomMenu = React.createClass({displayName: 'BottomMenu',
  submitClicked: function() {
    this.props.submit();
  },

  closeWindow: function() {
    window.open('','_self').close();
  },

  render: function() {
    return (
      React.DOM.nav( {className:"navbar navbar-default navbar-fixed-bottom", role:"navigation"}, 
        React.DOM.ul( {className:"nav navbar-nav navbar-right"}, 
          React.DOM.li( {className:"close"}, React.DOM.button( {className:"close", onClick:this.closeWindow}, "Close")),
          React.DOM.li( {className:"lastItem send"}, React.DOM.button( {className:"send", onClick:this.submitClicked}, "Send all Concerns"))
        )
      )
    );
  }
});