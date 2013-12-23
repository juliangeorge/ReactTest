/** @jsx React.DOM */

var MenuTile = React.createClass({
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
      ? <img src={this.props.tile.mainimg} className={this.props.tile.mainImgClass}/>
      : <div>
          <span className="text large">{this.props.tile.main}</span>
          <span className="text">{this.props.tile.submain}</span>
        </div>;

    return (
      <div className={classes}>
        <div className="tile-content">
          <span className="text">{this.props.tile.heading}</span>
          {main}
        </div>
        <div className="tile-footer">
          <span className="text">{this.props.tile.footer}</span>
        </div>
      </div>
    );
  }
});