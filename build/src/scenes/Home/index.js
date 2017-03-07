import React from "react";
import History from "./History/index.js";
import Event from "./Event/index.js";
import Carousel from "./Carousel/index.js";
import Gallery from "./Gallery/index.js";

export default class Home extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <History></History>
        <Event></Event>
        <div className="dashboard-component" id="news"></div>
        <Gallery></Gallery>
        <Carousel></Carousel>
        <div className="dashboard-component" id="pages"></div>
      </div>
    )
  }
}
