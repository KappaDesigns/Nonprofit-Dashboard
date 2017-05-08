import React from "react";
import { Link } from "react-router";

export default class ActionButton extends React.Component {
  constructor() {
    super();
    this.state = {

    }
    this.state.actions = ["read", "write", "speak"]
  }

  componentDidMount() {
    $('.action-button').click(() => {
      $('#action-list').slideToggle();
    })
  }

  render() {
    return (
      <div className="action-button">
        <div>+</div>
        <ul id="action-list">
          {this.state.actions.map((action) => {
            return (
              <Link to={"/"+action} className="action">{action}</Link>
            )
          })}
        </ul>
      </div>
    )
  }
}
