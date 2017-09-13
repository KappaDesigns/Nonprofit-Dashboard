import React from "react";
import moment from "moment";
import Overlay from "./Overlay";

export default class Event extends React.Component {
    constructor(props) {
        super();
        this.state = {
            style: {
                position: 'relative',
                backgroundImage: `url("${props.event.src}")`,
            }
        }
        this.changePosition = this.changePosition.bind(this);
        fetch(`/api/authenticated`, {
			method: "post",
			credentials: "same-origin"
		})
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			if (!json.isAuthenticated) {
				window.location.href = "/login";
				return;
			}
		});
    }

    render() {
        return (
            <div style={this.state.style} className="event">
                <div className="data">
                    <h2 className="date">{moment(this.props.event.date).format("M/D/YY")}</h2>
                    <h1 className="title">{this.props.event.title}</h1>
                </div>
                <Overlay classCallback={this.changePosition} event={this.props.event}/>
            </div>
        )
    }

    changePosition(pos) {
        let style = this.state.style;
        style.position = pos;
        this.setState({
            style: style,
        });
    }
}