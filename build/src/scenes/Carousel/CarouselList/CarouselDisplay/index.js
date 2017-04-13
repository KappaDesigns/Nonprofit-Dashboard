import React from "react";

export default class CarouselDisplay extends React.Component {
	constructor() {
		super();
		this.state = {
			slideIndex: 0,
			carousel:[],
			active: false,
			play: false
		}
		this.handleClick = this.handleClick.bind(this);
		this.getActiveState = this.getActiveState.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
		this.play = this.play.bind(this);
	}

	componentWillMount() {
		this.setState({
			active: this.props.active,
			carousel: this.props.carousel,
			handleCurrentCarousel: this.props.handleCurrentCarousel
		})
	}

	componentWillReceiveProps(props) {
		this.setState({
			carousel: props.carousel,
			active: props.active
		})
	}

	render() {
		let style = {
			backgroundImage: `url(${this.state.carousel.data[this.state.slideIndex].src})`,
			backgroundSize: "cover"
		}
		return (
			<div style={style} className={`carousel-display ${this.getActiveState()}`} key={`${this.props.index}-display`}
			onClick={this.handleClick} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}></div>
		)
	}

	getActiveState() {
		if (this.state.active) {
			return "active";
		} else {
			return "";
		}
	}

	handleEnter() {
		this.setState({
			play: true,
			loop: setInterval(this.play, 1000)
		})
	}

	play() {
		let index = this.state.slideIndex;
		index++;
		if (index > this.state.carousel.data.length - 1) {
			index = 0;
		}
 		this.setState({
			slideIndex: index
		})
	}

	handleLeave() {
		clearInterval(this.state.loop);
		this.setState({
			play: false,
			slideIndex: 0,
			loop: ""
		})
	}

	handleClick() {
		this.state.handleCurrentCarousel(this.state.carousel);
	}
}
