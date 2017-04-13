import React from "react";

import EditPanel from "./EditPanel";
import CarouselList from "./CarouselList";

export default class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: ["about", "contact", "home"],
      index: 0,
      carousels: [
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
            {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc", isHidden: true}
          ]
        },
        {
          page: "about",
          data: [
            {src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc", isHidden: true},
            {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc", isHidden: true},
          ]
        }
      ]
    }
    this.handleCurrentCarousel = this.handleCurrentCarousel.bind(this);
  }

  componentWillMount() {
    this.setState({
      currentCarousel: this.state.carousels[0]
    })
  }

  render() {
    return (
      <div>
        <EditPanel carousel={this.state.currentCarousel.data}>
        </EditPanel>
        <hr/>
        <CarouselList index={this.state.index} handleCurrentCarousel={this.handleCurrentCarousel} carousels={this.state.carousels}
        pages={this.state.pages}>
        </CarouselList>
      </div>
    )
  }

  handleCurrentCarousel(carousel) {
    let index = this.indexOf(carousel);
    console.log(index);
    this.setState({
      currentCarousel: carousel,
      index:index
    })
  }

  indexOf(carousel) {
    for (let i = 0; i < this.state.carousels.length; i++) {
      if (this.testObjectEquality(this.state.carousels[i], carousel)) {
        return i;
      }
    }
    return -1;
  }

  testObjectEquality(obj1, obj2) {
    let aProps = Object.getOwnPropertyNames(obj1);
    let bProps = Object.getOwnPropertyNames(obj2);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (obj1[propName] !== obj2[propName]) {
            return false;
        }
    }
    return true;
  }
}
