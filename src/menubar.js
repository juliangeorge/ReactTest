/** @jsx React.DOM */

var MenuBar = React.createClass({
  render: function() {
    return (
      <div>
        <MenuTile
          owner="true"
          heading="Åge Tjelta Landråk"
          mainimg="img/icon_user.png"
          submain=""
          footer="Invited by"/>
        <MenuTile
          invitee="true"
          heading="anders.osthus@gmail.com"
          mainimg="img/icon_user.png"
          submain=""
          footer="1 of 2 participants"/>
        <MenuTile
          process="true"
          heading="Analyze Risk"
          mainimg="img/icon_circles.png"
          submain=""
          footer="Process Step"/>
        <MenuTile
          calendar="true"
          heading="December"
          main="28"
          submain="Saturday"
          footer="Deadline"/>
      </div>
    );
  }
});