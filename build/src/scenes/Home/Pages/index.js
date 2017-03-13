import React from "react";
import { Link } from "react-router";
import Page from "./Page/index.js";

export default class Pages extends React.Component  {
	constructor() {
		super();
		this.state = {
			pages: [
				{
					src: "http://cnn.com",
					title: "Home"
				},
				{
					src: "http://cnn.com",
					title: "About"
				},
				{
					src: "http://cnn.com",
					title: "Contact"
				}
			]
		}
	}

	render() {
		return (
			<div className="dashboard-component" id="pages">
				{
					this.state.pages.map((page, i) => {
						return (
							<Page key={i} page={page}></Page>
						)
					})
				}
			</div>
		)
	}
}
