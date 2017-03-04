import React from "react";
import { Link } from "react-router";

export default class Navbar extends React.Component {
	render() {
		let url = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/810px-Raspberry_Pi_Logo.svg.png"
		return (
			<nav className="navbar">
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
