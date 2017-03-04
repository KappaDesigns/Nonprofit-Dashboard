import React from "react";
import { Link } from "react-router";

export default class NotFound extends React.Component {
  render() {
    return (
      <div id="not-found">
        <div className="jumbotron">
          <h1 className="notfound">404</h1>
        </div>
        <h1 className="not-found-text">Looks like the page you were looking for doesn't exist!</h1>
        <Link to="/" className="home">Take Me Home!</Link>
      </div>
    )
  }
}
