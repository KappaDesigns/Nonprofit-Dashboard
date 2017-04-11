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
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleURLClose = this.handleURLClose.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
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
      backgroundPosition: 'center'
    }

    let createSlide = (slide, index) => {
      let style = {
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${slide.src})`
      }
      if (index == self.state.currentSlideIndex) {
        return (
          <div onDragOver={this.handleDragOver} onDrop={this.handleDragDrop} onDragStart={this.handleDragStart} onClick={this.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide active"></div>
        )
      } else {
        return (
          <div onDragOver={this.handleDragOver} onDrop={this.handleDragDrop} onDragStart={this.handleDragStart} onClick={this.handleActive} id={`slide-${index}`} key={index} draggable style={style} className="draggable-slide"></div>
        )
      }
    }
    let hidden = `image-change-container ${this.getHiddenState()}`;
    return (
      <div className="carousel-container">
        <h1 className="header">Edit Carousel</h1>
        <div onDoubleClick={this.handleBackgroundChange} style={style} className="carousel-display">
          <div className="desc-container">
            <textarea onChange={this.handleEdit} value={this.state.currentSlide.desc} className="desc" type="text"></textarea>
          </div>
          <span onClick={this.handleDelete} className="remove-slide">Delete Slide</span>
          <div className={hidden}>
            <div className="modal-header">
              <h3 className="background-header">Change Background URL</h3>
              <span onClick={this.handleURLClose}  className="close-background">X</span>
            </div>
            <input value={this.state.currentSlide.src} onChange={this.handleURLChange} className="background-url" type="text" placeholder="url..."/>
          </div>
        </div>
        <span onClick={this.handleAdd} className="add-slide">Add Slide</span>
        <div className="carousel-controls">
          <span onClick={this.handlePrev} className="prev">{"<"}</span>
          <span onClick={this.handleNext} className="next">{">"}</span>
        </div>

        <div className="scroll-container">
          <div className="carousel-order">
            {this.props.carousel.map(createSlide, 0)}
          </div>
        </div>
      </div>
    )
  }

  handleURLChange(e) {
    let slide = this.state.currentSlide;
    slide.src = e.target.value;
    this.setState({
      currentSlide: slide
    })
  }

  handleURLClose() {
    let slide = this.state.currentSlide;
    slide.isHidden = !slide.isHidden;
    this.setState({
      currentSlide: slide
    })
  }

  getHiddenState() {
    if (this.state.currentSlide.isHidden) {
      return "hidden";
    } else {
      return "";
    }
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
    let index = e.target.id.split("-")[1];
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

  handleBackgroundChange() {
    let slide = this.state.currentSlide;
    slide.isHidden = !slide.isHidden;
    this.setState({
      currentSlide: slide
    })
  }

  handleDelete() {
    let index = this.state.currentSlideIndex;
    this.state.currentCarousel.splice(index, 1);
    if (index == this.state.currentCarousel.length) {
      index--;
    }
    this.setState({
      currentSlideIndex: index,
      currentSlide: this.state.currentCarousel[index],
    })
  }

  handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragDrop(e) {
    e.preventDefault();
    let index1 = e.dataTransfer.getData("text");
    index1 = index1.substring(6, index1.length);
    let index2 = e.target.id;
    index2 = index2.substring(6, index2.length);
    console.log(index1, index2);
    if (index1 != index2) {
      let carousel = this.state.currentCarousel;
      console.log(carousel);
      let slide = carousel[index1];
      carousel.splice(index1, 1);
      carousel.splice(index2, 0, slide);
      this.setState({
        currentCarousel: carousel,
        currentSlide: carousel[index2],
        currentSlideIndex: index2
      })
    }
  }

  handleDragDiv(e) {
    e.preventDefault();
  }

  handleAdd() {

  }
}
