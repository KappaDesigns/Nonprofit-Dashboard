import React from "react";

import EditPanel from "./EditPanel";
import CarouselList from "./CarouselList";

export default class Carousel extends React.Component {
  render() {
    return (
      <div>
        <EditPanel carousel={[{src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg"}, {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg"}]}></EditPanel>
        <CarouselList></CarouselList>
      </div>
    )
  }
}
