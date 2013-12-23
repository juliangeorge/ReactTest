/** @jsx React.DOM */

var Slider = slidr;

var MenuTile = React.createClass({displayName: 'MenuTile',
  componentDidMount: function() {
    var s = Slider.create(this.props.tile.name, {
      controls: 'none',
      overflow: false,
      timing: { 'cube': '1s ease-in' },
      transition: 'cube'
    });
    s.add('h', ['one', 'two', 'one'], 'cube').auto(10000);
    s.start();
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'tile': true,
      'owner': this.props.tile.owner,
      'invitee': this.props.tile.invitee,
      'process': this.props.tile.process,
      'calendar': this.props.tile.calendar,
      'visible-lg': true,
      'visible-md': true
    });

    var main = this.props.tile.mainimg
      ? React.DOM.img( {src:this.props.tile.mainimg, className:this.props.tile.mainImgClass})
      : React.DOM.div(null, 
          React.DOM.span( {className:"text large"}, this.props.tile.main),
          React.DOM.span( {className:"text"}, this.props.tile.submain)
        );

    return (
      React.DOM.div( {id:this.props.tile.name, className:"inline"}, 
        React.DOM.div( {className:classes, 'data-slidr':"one"}, 
          React.DOM.div( {className:"tile-content"}, 
            React.DOM.span( {className:"text"}, this.props.tile.heading),
            main
          ),
          React.DOM.div( {className:"tile-footer"}, 
            React.DOM.span( {className:"text"}, this.props.tile.footer)
          )
        ),
        React.DOM.div( {className:classes, 'data-slidr':"two"}, 
          React.DOM.div( {className:"tile-footer"}, 
            React.DOM.span( {className:"text"}, "Hei")
          )
        )
      )
    );
  }
});