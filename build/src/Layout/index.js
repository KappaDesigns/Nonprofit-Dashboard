import React from "react";
import ActionButton from "./ActionButton";

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<div>
					{this.props.children}
				</div>
				<ActionButton></ActionButton>
			</div>
		)
	}
}
