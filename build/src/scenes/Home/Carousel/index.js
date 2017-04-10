import React from "react";
import { Link } from "react-router";

export default class Carousel extends React.Component {
	constructor() {
		super();
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	handlePrev(e) {
		e.preventDefault();
		console.log("prev");
	}

	handleNext(e) {
		e.preventDefault();
		console.log("next");
	}

	render() {
		return (
			<Link to={`/carousel/`} className="dashboard-component" id="carousel">
				<h1 className="carousel-title">Carousel</h1>
				<div className="carousel-slider">
					<div className="slide" id="#slide-1">
						<h3 className="slide-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
					</div>
					<span onClick={this.handlePrev} class="prev">{"<"}</span>
					<span onClick={this.handleNext} class="next">{">"}</span>
				</div>
			</Link>
		)
	}
}
