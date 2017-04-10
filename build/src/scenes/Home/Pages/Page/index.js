import React from "react";
import { Link } from "react-router";

export default class Page extends React.Component {
	render() {
		return (
			<div>
				<Link class="page" to={`/pages/${this.props.page.title.toLowerCase()}`}>
				</Link>
				<iframe class="page-frame" src={this.props.page.src}></iframe>
			</div>
		)
	}
}
