import React from "react";
import History from "./History/index.js";
import Event from "./Event/index.js";
import News from "./News/index.js";

export default class Home extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <History></History>
        <Event></Event>
        <News></News>
        <div className="dashboard-component" id="gallery"></div>
        <div className="dashboard-component" id="carousel"></div>
        <div className="dashboard-component" id="pages"></div>
      </div>
    )
  }
}
