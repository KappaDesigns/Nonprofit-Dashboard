import React from "react";

export default class Featured extends React.Component {
    constructor(props) {
        super();

        let featured = props.events.filter((event) => {
            return event.featured === "true";
        });
        let ids = featured.map((event) => {
            return event._id;
        });

        this.state = {
            featuredIDs: ids,
            events: props.events,
        }

        this.updateFeatured = this.updateFeatured.bind(this);
    }

    render() {
        console.log(this.state.featuredIDs);
        return (
            <div className="featured-modal">
                <div className="featured-container">
                    <span className="close" onClick={this.props.closeModal}>X</span>
                    <h1>Choose Featured Events</h1>
                    <h4>You Can Only Have 3 Featured Events</h4>
                    {
                        this.props.events.map((event, i) => {
                            let checked = event.featured == "true" || event.featured == true;
                            return (
                                <div key={event._id} class="event">
                                    <input type="checkbox" id={i} onClick={this.updateFeatured} readOnly={false} checked={checked}/>
                                    <h3 className="event-title">{event.title}</h3>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }

    updateFeatured(e) {
        let events = this.state.events;
        let ids = this.state.featuredIDs;

        if (events[e.target.id].featured == "true") {
            ids.splice(ids.indexOf(events[e.target.id]._id), 1);
            events[e.target.id].featured = "false";
        } else {
            ids.unshift(events[e.target.id]._id);
            events[e.target.id].featured = "true"; 
            if (ids.length > 3) {
                let i = ids.pop();
                events.forEach((event) => {
                    if (event._id == i) {
                        event.featured = "false";
                    }
                });
            }
        }
        this.setState({
            featuredIDs: ids,
            events: events,
        });
        fetch(`/api/event/featured`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
        })
    }
}