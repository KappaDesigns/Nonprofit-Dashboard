import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Page from "./Page";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}></Route>
      </Router>
    )
  }
}

ReactDom.render(<App></App>, document.getElementById('app'));
