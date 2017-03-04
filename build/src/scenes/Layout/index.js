import React from "react";
import Navbar from "./Navbar/index.js";
import ActionButton from "./ActionButton/index.js";

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>
				<div className="container">
					{this.props.children}
				</div>
				<ActionButton></ActionButton>
			</div>
		)
	}
}
