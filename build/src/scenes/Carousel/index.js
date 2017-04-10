import React from "react";

import EditPanel from "./EditPanel";
import CarouselList from "./CarouselList";

export default class Carousel extends React.Component {
  render() {
    return (
      <div>
        <EditPanel carousel={[{src:"https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg", desc:"desc"}, {src:"http://www.projecthappyhearts.com/wp-content/uploads/2015/04/green-nature-dual-monitor-other.jpg", desc:"desc"}, {src:"https://www-tc.pbs.org/wnet/nature/files/2016/09/mezzanine_329.jpg", desc:"desc"}]}></EditPanel>                                           
        <CarouselList></CarouselList>
      </div>
    )
  }
}
