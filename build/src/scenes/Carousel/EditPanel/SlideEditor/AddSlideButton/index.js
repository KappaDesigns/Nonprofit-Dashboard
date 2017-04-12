import React from "react";

export default class AddSlideButton extends React.Component {

	render() {
		return (
			<span onClick={this.props.handleClick} className="add-slide">Add Slide</span>
		)
	}

}
