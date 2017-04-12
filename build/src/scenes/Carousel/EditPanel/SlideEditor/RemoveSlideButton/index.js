import React from "react";

export default class RemoveSlideButton extends React.Component {
	render() {
		return (
			<span onClick={this.props.handleSlideRemove} className="remove-slide">Delete Slide</span>
		)
	}
}
