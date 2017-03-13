import React from "react";
import { Link } from "react-router";

export default class Page extends React.Component {
	render() {
		return (
			<Link class="page" to={`/pages/${this.props.page.title.toLowerCase()}`}>
				<iframe class="page-frame" src={this.props.page.src}></iframe>
			</Link>
		)
	}
}
