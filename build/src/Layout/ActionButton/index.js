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
        color: "rgb(232, 84, 37)",
        icon: "fa fa-file-text fa-2x"
      },
      {
        tooltip: "Profile",
        path: `/user/1`,
        color: "rgb(156, 156, 156)",
        icon: "fa fa-user fa-2x"
      },
      {
        tooltip: "Logout",
        path: "/logout",
        color: "rgb(37, 182, 201)",
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
              <span className="action-wrapper">
                <Link key={action.path} style={style} to={action.path} className="action">
                  <i key={action.icon} class={action.icon} aria-hidden="true"></i>
                </Link>
                <span className="admin-tooltip">{action.tooltip}</span>
              </span>
            )
          })}
        </ul>
      </div>
    )
  }
}
