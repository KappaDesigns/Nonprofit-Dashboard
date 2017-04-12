import React from "react";

export default class CarouselControls extends React.Component {
	render() {
		
		return (
			<div className="carousel-controls">
				<span onClick={this.props.handlePrev} className="prev">{"<"}</span>
				<span onClick={this.props.handleNext} className="next">{">"}</span>
			</div>
		)
	}
}
