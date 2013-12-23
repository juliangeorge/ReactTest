/** @jsx React.DOM */

var MenuBar = React.createClass({
  getInitialState: function () {
    var invitedByTile = {
      owner:        true,
      heading:      "Åge Tjelta Landråk",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "Invited by",
    };

    var participantsTile = {
      invitee:       true,
      heading:      "anders.osthus@gmail.com",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "1 of 2 participants",
    };

    var processTile = {
      process:       true,
      heading:      "Analyze Risk",
      mainimg:      "img/icon_circles.png",
      mainImgClass: "img down",
      submain:      "",
      footer:       "Process Step",
    };

    var calendarTile = {
      calendar:     true,
      heading:      "December",
      main:         "28",
      submain:      "Saturday",
      footer:       "Deadline",
    };

    return {
      invitedByTile: invitedByTile,
      participantsTile: participantsTile,
      processTile: processTile,
      calendarTile: calendarTile
    }
  },

  render: function() {
    return (
      <div>
        <MenuTile tile={this.state.invitedByTile} />
        <MenuTile tile={this.state.participantsTile} />
        <MenuTile tile={this.state.processTile} />
        <MenuTile tile={this.state.calendarTile} />
      </div>
    );
  }
});