import React from "react";
import History from "./History/index.js"

export default class Home extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <History></History>
        <div className="dashboard-component" id="events"></div>
        <div className="dashboard-component" id="news"></div>
        <div className="dashboard-component" id="gallery"></div>
        <div className="dashboard-component" id="carousel"></div>
        <div className="dashboard-component" id="pages"></div>
      </div>
    )
  }
}
