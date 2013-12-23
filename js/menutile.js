/** @jsx React.DOM */

var MenuTile = React.createClass({displayName: 'MenuTile',
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'tile': true,
      'owner': this.props.owner,
      'invitee': this.props.invitee,
      'process': this.props.process,
      'calendar': this.props.calendar
    });

    var main = this.props.mainimg
      ? React.DOM.img( {src:this.props.mainimg, className:"tile content mainimg"})
      : this.props.main;

    return (
      React.DOM.div( {className:classes}, 
        React.DOM.span( {className:"tile content heading"}, this.props.heading),
        React.DOM.span( {className:"tile content main"}, main),
        React.DOM.span( {className:"tile content submain"}, this.props.submain),
        React.DOM.span( {className:"tile content footer"}, this.props.footer)
      )
    );
  }
});