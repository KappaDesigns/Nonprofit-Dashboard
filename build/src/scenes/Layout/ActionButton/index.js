import React from "react";
import { Link } from "react-router";
import Tooltip from "./Tooltip/index.js";

export default class ActionButton extends React.Component {
	constructor() {
		super();
		this.state = {
			actions: [
				{
					id: "profile",
					cssID: "action-1",
					icon: "fa fa-user fa-2x",
					link: "profile/id",
					tooltip: "View Profile"
				},
				{
					id: "sign-out",
					cssID: "action-2",
					icon: "fa fa-sign-out fa-2x",
					link: "/api/logout",
					tooltip: "Sign Out"
				},
			],
			displayMenu: false
		}
		this.handleButton = this.handleButton.bind(this);
	}

	handleButton() {
		let displaying = !this.state.displayMenu;
		if (!displaying) {
			let index = 0;
			this.state.actions.map((action) => {
				index++;
				$(`#${action.id}`).css({
					transition: "all 0.5s ease",
					transform: `translateY(${0}px)`
				})
			})
			let self = this;
			setTimeout(function () {
				self.setState({
					displayMenu: false
				})
			}, 500);
		} else {
			this.setState({
				displayMenu: true
			})
		}

	}

	render() {
		let state = this.state;
		setTimeout(function () {
			let index = 0;
			state.actions.map((action) => {
				index++;
				$(`#${action.id}`).css({
					transition: "all 0.5s ease",
					transform: `translateY(${-80 * index}px)`
				})
			})
		}, 200);
		if (this.state.displayMenu) {
			return (
				<div className="action-button-contianer">
					<div onClick={this.handleButton} className="action-button"><span className="button-text">+</span></div>
					<div className="action-menu">
						{this.state.actions.map((action, i) => {
							return (
								<div class="action" key={i}>
									<Tooltip action={action.cssID} customID={action.id} tooltip={action.tooltip}></Tooltip>
									<div style={action.style} id={action.id} class="action-container">
										<Link class="action-link" to={action.link} id={action.cssID} className="action"><i class={action.icon} aria-hidden="true"></i></Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)
		} else {
			return (
				<div className="action-button-contianer">
					<div onClick={this.handleButton} className="action-button"><span className="button-text">+</span></div>
				</div>
			)
		}
	}
}
