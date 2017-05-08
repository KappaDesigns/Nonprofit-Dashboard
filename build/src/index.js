import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Page from "./Page";
import Login from "./Login";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}></Route>
        <Route path="/login" component={Login}></Route>
      </Router>
    )
  }
}

ReactDom.render(<App></App>, document.getElementById('app'));
