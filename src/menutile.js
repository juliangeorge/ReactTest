/** @jsx React.DOM */

var Slider = slidr;

var MenuTile = React.createClass({
  componentDidMount: function() {
    var s = Slider.create(this.props.tile.name, {
      controls: 'none',
      overflow: false 
    });
    s.add('h', ['one', 'two', 'one']).auto(5000);
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
      ? <img src={this.props.tile.mainimg} className={this.props.tile.mainImgClass}/>
      : <div>
          <span className="text large">{this.props.tile.main}</span>
          <span className="text">{this.props.tile.submain}</span>
        </div>;

    return (
      <div id={this.props.tile.name} className="inline">
        <div className={classes} data-slidr="one">
          <div className="tile-content">
            <span className="text">{this.props.tile.heading}</span>
            {main}
          </div>
          <div className="tile-footer">
            <span className="text">{this.props.tile.footer}</span>
          </div>
        </div>
        <div className={classes} data-slidr="two">
          <div className="tile-footer">
            <span className="text">Hei</span>
          </div>
        </div>
      </div>
    );
  }
});