import React from "react";
import { Link } from "react-router";

export default class Navbar extends React.Component {
	constructor() {
		super();
		this.handleScroll = this.handleScroll.bind(this);
		this.state = {
			style: {
				boxShadow: "",
			}
		}
	}

	componentWillMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		let self = this;
		let timeout = setTimeout(function () {
			self.setState({
				style: {
					boxShadow: ""
				}
			})
		}, 750);

		this.setState({
			style: {
				boxShadow: "0px 10px 5px 0px rgba(0,0,0,0.75)",
			}
		})
	}

	render() {
		let url = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/810px-Raspberry_Pi_Logo.svg.png";
		return (
			<nav style={this.state.style} className="navbar">
				<Link className="navbar-logo" id="logo" to="/"><img src={url} alt="Logo" className="logo"/></Link>
				<Link className="navbar-link" id="link-1" to="/pages"><span className="link-text">Pages</span></Link>
				<Link className="navbar-link" id="link-2" to="/events"><span className="link-text">Events</span></Link>
				<Link className="navbar-link" id="link-3" to="/news"><span className="link-text">News</span></Link>
				<Link className="navbar-link" id="link-4" to="/carousel"><span className="link-text">Carousels</span></Link>
				<Link className="navbar-link" id="link-5" to="/galleries"><span className="link-text">Galleries</span></Link>
			</nav>
		)
	}
}
