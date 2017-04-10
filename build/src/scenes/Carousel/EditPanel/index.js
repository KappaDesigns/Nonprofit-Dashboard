import React from "react";

export default class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSlideIndex: 0,
      currentSlide: {},
    }
  }

  componentWillMount() {
    let slide = this.props.carousel[0];
    this.setState({
      carousel: this.props.carousel,
      currentSlide: slide
    })
  }

  render() {
    let i = 0;
    let style = {
      backgroundImage: `url(${this.state.currentSlide.src})`,
      backgroundSize: `cover`,
    }
    return (
      <div className="carousel-container">
        <h1 className="header">Edit Carousel</h1>
        <div style={style} className="carousel-display">
          <div className="desc-container">
            <textarea className="desc" type="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </textarea>
          </div>
          <span className="remove-slide">Delete Slide</span>
        </div>

        <div className="carousel-controls">
          <span className="prev">{"<"}</span>
          <span className="next">{">"}</span>
        </div>

        <div className="carousel-order">
          {
            this.props.carousel.map((slide) => {
              i++;
              let style = {
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundImage: `url(${slide.src})`
              }
              if (i == 1) {
                return (
                  <div key={i} draggable style={style} className="draggable-slide active"></div>
                )
              } else {
                return (
                  <div key={i} draggable style={style} className="draggable-slide"></div>
                )
              }
            })
          }
        </div>
      </div>
    )
  }

  handleNext() {

  }

  handlePrev() {

  }

  handleActive() {
    
  }

  handleEdit() {

  }

  handleDelete() {

  }

  handleAdd() {

  }
}
