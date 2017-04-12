import React from "react";
import SlideEditor from "./SlideEditor/index.js";
import CarouselControls from "./CarouselControls/index.js";
import SlideOrderer from "./SlideOrderer/index.js";

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
    this.handleURLClose = this.handleURLClose.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleAddSlide = this.handleAddSlide.bind(this);
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
    let style = {
      backgroundImage: `url(${this.state.currentSlide.src})`,
      backgroundSize: `cover`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'center'
    }
    let width = {
      width: 250 * this.state.currentCarousel.length + 25 * this.state.currentCarousel.length - 1
    }
    return (
      <div className="carousel-container">
        <h1 className="header">Edit Carousel</h1>
        
        <SlideEditor customStyle={style} slide={this.state.currentSlide} handleSlideRemove={this.handleDelete}
        handleURLModalClose={this.handleURLClose} handleURLChange={this.handleURLChange}
        handleAddSlide={this.handleAddSlide} handleDescEdit={this.handleEdit}>
        </SlideEditor>

        <CarouselControls handleNext={this.handleNext} handlePrev={this.handlePrev}></CarouselControls>

        <SlideOrderer handleDragOver={this.handleDragOver} handleDragDrop={this.handleDragDrop}
        handleDragStart={this.handleDragStart} handleActive={this.handleActive} scrollWidth={width}
        carousel={this.state.currentCarousel} slideIndex={this.state.currentSlideIndex}>
        </SlideOrderer>
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
    if (index1 != index2) {
      let carousel = this.state.currentCarousel;
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

  handleAddSlide(url, desc, isValid) {
    let carousel = this.state.currentCarousel;
    if (isValid) {
      let data = {
        src: url,
        desc: desc,
        isHidden: true
      }
      carousel.push(data);
      this.setState({
        currentCarousel: carousel
      })
    }
  }
}
