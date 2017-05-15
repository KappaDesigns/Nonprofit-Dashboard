import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Page from "./Page";
import Login from "./Login";
import Logout from "./Logout/";
import Pages from "./Pages";
import Layout from "./Layout";
import User from "./User";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route path="/" component={Page}></Route>
          <Route path="/page/:id" component={Page}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/pages" component={Pages}></Route>
        </Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Router>
    )
  }
}

ReactDom.render(<App></App>, document.getElementById('app'));
