import React from "react";
import CarouselDisplay from "./CarouselDisplay/index";

export default class CarouselList extends React.Component {
  constructor() {
    super();
    this.state = {
      carousels: []
    }
    this.mapCarousels = this.mapCarousels.bind(this);
    this.filterCarousel = this.filterCarousel.bind(this);
    this.mapFilteredCarousels = this.mapFilteredCarousels.bind(this);
  }

  componentWillMount() {
    this.setState({
      carousels: this.props.carousels,
      index: 0,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      index: props.index
    })
  }

  render() {
    return (
      <div className="carousel-list">
        {
          this.props.pages.map(this.mapCarousels)
        }
      </div>
    )
  }

  filterCarousel(carousel) {
    return carousel.page == this.page;
  }

  mapFilteredCarousels(carousel, index) {
    if (this.state.index == index) {
      return (
        <CarouselDisplay active={true} key={`${index}-carousel-display`} handleCurrentCarousel={this.props.handleCurrentCarousel} index={index} carousel={carousel}></CarouselDisplay>
      )
    } else {
      return (
        <CarouselDisplay active={false} key={`${index}-carousel-display`} handleCurrentCarousel={this.props.handleCurrentCarousel} index={index} carousel={carousel}></CarouselDisplay>
      )
    }
  }

  mapCarousels(page) {
    this.page = page;
    let carouselsOnPage = this.props.carousels.filter(this.filterCarousel);
    let width = carouselsOnPage.length * 250 + carouselsOnPage.length * 25;
    let style = {
      width: width
    }
    return (
      <div className="carousel-row" key={`${page}-row`}>
        <h1 key={`${page}-header`} className="carousel-page-header">{page}</h1>
        <div style={style} key={`${page}-container`} className="carousel-page-continer">
          {
            carouselsOnPage.map(this.mapFilteredCarousels)
          }
        </div>
      </div>
    );
  }
}
