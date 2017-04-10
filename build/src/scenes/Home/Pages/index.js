import React from "react";
import { Link } from "react-router";
import Page from "./Page/index.js";

export default class Pages extends React.Component  {
	constructor() {
		super();
		this.state = {
			pages: [
				{
					src: "http://kappadesigns.org",
					title: "Home"
				},
				{
					src: "http://blog.kappadesigns.org",
					title: "About"
				},
				{
					src: "http://mundanewebsitename.me",
					title: "Contact"
				}
			]
		}
	}

	render() {
		return (
			<div className="dashboard-component" id="pages">
				<h1 className="page-title">Pages</h1>
				<div className="pages-container">
					{
						this.state.pages.map((page, i) => {
							return (
								<Page key={i} page={page}></Page>
							)
						})
					}
				</div>
			</div>
		)
	}
}
