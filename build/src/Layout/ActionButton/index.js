import React from "react";
import { Link } from "react-router";

export default class ActionButton extends React.Component {
  constructor() {
    super();
    this.state = {

    }
    this.state.actions = [
      {
        tooltip: "Pages",
        path: "/pages",
        color: "rgb(57, 228, 58)",
        icon: "fa fa-file-text fa-2x"
      },
      {
        tooltip: "Profile",
        path: `/user/1`,
        color: "rgb(24, 234, 241)",
        icon: "fa fa-user fa-2x"
      },
      {
        tooltip: "Logout",
        path: "/logout",
        color: "rgb(180, 110, 6)",
        icon: "fa fa-sign-out fa-2x"
      }
    ]
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
            let style = {
              backgroundColor: action.color
            }
            return (
              <Link key={action.path} style={style} to={action.path} className="action">
                <i key={action.icon} class={action.icon} aria-hidden="true"></i>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
}
