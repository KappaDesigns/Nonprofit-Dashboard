import React from "react";

export default class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSlideIndex: 0,
      currentCarousel: [],
      currentSlide: {},
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    let slide = this.props.carousel[0];
    this.setState({
      currentCarousel: this.props.carousel,
      currentSlide: slide
    })
  }

  render() {
    let index = 0;
    let self = this;
    let style = {
      backgroundImage: `url(${this.state.currentSlide.src})`,
      backgroundSize: `cover`,
      backgroundRepeat: `no-repeat`,
    }

    let createSlide = (slide, index) => {
      let style = {
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${slide.src})`
      }
      if (index - 1 == self.state.currentSlideIndex) {
        return (
          <div onClick={this.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide active"></div>
        )
      } else {
        return (
          <div onClick={this.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide"></div>
        )
      }
    }

    return (
      <div className="carousel-container">
        <h1 className="header">Edit Carousel</h1>
        <div style={style} className="carousel-display">
          <div className="desc-container">
            <textarea onChange={this.handleEdit} value={this.state.currentSlide.desc} className="desc" type="text"></textarea>
          </div>
          <span onClick={this.handleDelete} className="remove-slide">Delete Slide</span>
        </div>

        <div className="carousel-controls">
          <span onClick={this.handlePrev} className="prev">{"<"}</span>
          <span onClick={this.handleNext} className="next">{">"}</span>
        </div>

        <div className="carousel-order">
          {this.props.carousel.map(createSlide, 0)}
        </div>
      </div>
    )
  }

  handleNext() {
    let index = this.state.currentSlideIndex;
    if (index < this.state.currentCarousel.length - 1) {
      index++;
    } else {
      index = 0;
    }
    this.setState({
      currentSlideIndex: index,
      currentSlide: this.state.currentCarousel[index]
    })
  }

  handlePrev() {
    let index = this.state.currentSlideIndex;
    if (index > 0) {
      index--;
    } else {
      index = this.state.currentCarousel.length - 1;
    }
    this.setState({
      currentSlideIndex: index,
      currentSlide: this.state.currentCarousel[index]
    })
  }

  handleActive(e) {
    let index = e.target.id.split("-")[1] - 1;
    this.setState({
      currentSlideIndex: index,
      currentSlide: this.state.currentCarousel[index]
    })
  }

  handleEdit(e) {
    let slide = this.state.currentSlide;
    slide.desc = e.target.value
    this.setState({
      currentSlide: slide
    })
  }

  handleDelete() {
    let index = this.state.currentSlideIndex;
    this.state.currentCarousel.splice(index, 1);
    this.setState({
      currentSlide: this.state.currentCarousel[index],
    })
  }

  handleAdd() {

  }
}
