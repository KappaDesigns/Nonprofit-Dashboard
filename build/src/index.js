import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import "./styles/css/main.css";

import Home from "./scenes/Home";
import NotFound from "./scenes/NotFound";

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Home}></Route>
				<Route path="*" component={NotFound}></Route>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
