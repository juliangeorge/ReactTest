/** @jsx React.DOM */

var MenuTile = React.createClass({
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
      ? <img src={this.props.mainimg} className="tile content mainimg"/>
      : this.props.main;

    return (
      <div className={classes}>
        <span className="tile content heading">{this.props.heading}</span>
        <span className="tile content main">{main}</span>
        <span className="tile content submain">{this.props.submain}</span>
        <span className="tile content footer">{this.props.footer}</span>
      </div>
    );
  }
});