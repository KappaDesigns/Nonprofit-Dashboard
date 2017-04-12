import React from "react";

export default class SlideOrderer extends React.Component {
	constructor() {
		super();
		this.state = {
			
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			index: props.slideIndex
		})
	}

	render() {
		let createSlide = (slide, index) => {
      let style = {
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${slide.src})`
      }
      if (index == this.state.index) {
        return (
          <div onDragOver={this.props.handleDragOver} onDrop={this.props.handleDragDrop} onDragStart={this.props.handleDragStart} onClick={this.props.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide active"></div>
        )
      } else {
        return (
          <div onDragOver={this.props.handleDragOver} onDrop={this.props.handleDragDrop} onDragStart={this.props.handleDragStart} onClick={this.props.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide"></div>
        )
      }
    }
		return (
			<div className="scroll-container">
				<div style={this.props.scrollWidth} className="carousel-order">
					{this.props.carousel.map(createSlide, 0)}
				</div>
			</div>
		)
	}
}
