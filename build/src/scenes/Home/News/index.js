import React from "react";
import { Link } from "react-router";

export default class News extends React.Component {
  render() {
    return (
      <Link to="/news/id" className="dashboard-component" id="news">
        <h1 className="section-title">News</h1>
        <div className="news">
          <h1 className="news-title">Large Tiger Found</h1>
          <img src="https://s-media-cache-ak0.pinimg.com/736x/02/d2/ab/02d2aba78d02e543cae96ca2227bfa6e.jpg" alt="event-img" className="news-img"/>
          <br/>
          <br/>
          <span className="news-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <br/>
          <span className="news-date">{new Date().toDateString()}</span>
        </div>
      </Link>
    )
  }
}
