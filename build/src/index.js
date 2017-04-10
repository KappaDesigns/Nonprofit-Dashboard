import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import "./styles/css/main.css";

import Home from "./scenes/Home";
import NotFound from "./scenes/NotFound";
import Layout from "./scenes/Layout";
import Carousel from "./scenes/Carousel";

class App extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route component={Layout}>
					<Route path="/" component={Home}></Route>
					<Route path="/carousel" component={Carousel}></Route>
				</Route>
				<Route path="*" component={NotFound}></Route>
			</Router>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
