import React from "react";
import "whatwg-fetch";

export default class Logout extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		fetch(`/api/logout`, {
			method: "post",
			credentials:'same-origin'
		})
		.then(res => {
			window.location.href = "/login";
		})
	}

	render() {
		return (
			<div>
				<h1 className="admin-panel-logging-out">Logging Out</h1>
				<div class="sk-folding-cube">
					<div class="sk-cube1 sk-cube"></div>
					<div class="sk-cube2 sk-cube"></div>
					<div class="sk-cube4 sk-cube"></div>
					<div class="sk-cube3 sk-cube"></div>
				</div>
			</div>
		)
	}
}
