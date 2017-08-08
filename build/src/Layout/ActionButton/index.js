import React from "react";
import { Link } from "react-router";
import { actions } from "../../../../fConfig";
import jq from "jquery";

export default class ActionButton extends React.Component {
  constructor() {
    super();
    this.state = {

    }
    this.state.actions = actions
  }

  componentDidMount() {
    jq('.action-button').click(() => {
      jq('#action-list').slideToggle();
    })
  }

  render() {
    return (
      <div className="action-button">
        <div>+</div>
        <ul id="action-list">
          {this.state.actions.map((action, i) => {
            let style = {
              backgroundColor: action.color
            }
            return (
              <span key={`wrapper-${i}`} className="action-wrapper">
                <Link key={action.path} style={style} to={action.path} className="action">
                  <i key={action.icon} id={action.tooltip.toLowerCase()} class={action.icon} aria-hidden="true"></i>
                </Link>
                <span key={action.tooltip} className="admin-tooltip">{action.tooltip}</span>
              </span>
            )
          })}
        </ul>
      </div>
    )
  }
}
