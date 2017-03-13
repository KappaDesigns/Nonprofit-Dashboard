import React from "react";
import History from "./History/index.js";
import Event from "./Event/index.js";
import Carousel from "./Carousel/index.js";
import Gallery from "./Gallery/index.js";
import News from "./News/index.js";
import Pages from "./Pages/index.js";

export default class Home extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <History></History>
        <Event></Event>
        <News></News>
        <Gallery></Gallery>
        <Carousel></Carousel>
        <Pages></Pages>
      </div>
    )
  }
}
