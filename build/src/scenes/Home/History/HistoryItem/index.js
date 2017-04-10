import React from "react";
import { Link } from "react-router";

export default class HistoryItem extends React.Component {
  render() {
    let time = this.formatDate(new Date(this.props.time));
    return (
      <Link to={"/tbd"} className="history-row" id={this.props.time}>
        <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
        <span className="edit"><i class="fa fa-picture-o fa-1x"></i> { this.props.type } edited by User</span>
        <span className="edit-date">{time}</span>
        <span className="note"></span>
      </Link>
    )
  }

  formatDate(date) {
    let dateString = date.toString().substring(0, date.toString().length - 14);
    let time = dateString.substring(dateString.length - 9, dateString.length);
    dateString = dateString.substring(0, dateString.length - 9);
    let parts = time.split(":");
    let hour = parseInt(parts[0]);
    let timeOfDay = " [AM]";
    if (hour > 12) {
      hour -= 12;
      timeOfDay = " [PM]";
    }
    return dateString + hour + ":" + parts[1] + timeOfDay;
  }
}
