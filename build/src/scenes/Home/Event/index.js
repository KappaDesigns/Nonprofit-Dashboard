import React from "react";

import { Link } from "react-router";

export default class Event extends React.Component {
	render() {
		return (
			<Link to="/events/" className="dashboard-component" id="events">
				<h1 className="section-title">Events</h1>
				<div className="event">
					<h1 className="event-title">Event</h1>
					<img src="https://s-media-cache-ak0.pinimg.com/736x/02/d2/ab/02d2aba78d02e543cae96ca2227bfa6e.jpg" alt="event-img" className="event-img"/>
					<span className="event-date">{new Date().toDateString()}</span>
				</div>
			</Link>
		)
	}
}
