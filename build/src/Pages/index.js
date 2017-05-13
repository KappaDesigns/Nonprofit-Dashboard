import React from "react";
import { Link } from "react-router";
import "whatwg-fetch";

export default class Pages extends React.Component {
	constructor() {
		super();

		this.state = {

		};
		this.renderSiteMap = this.renderSiteMap.bind(this);
	}

	componentWillMount() {
		this.fetchSiteMap((a) => {
			this.setState({
				siteMap: a,
				fetched: true
			})
		});
	}

	fetchSiteMap(next) {
		fetch(`/api/pages`, {
			credentials: "same-origin"
		})
		.then(res => {
			return res.json();
		})
		.then(json => {
			if (json.hasOwnProperty("redirectToLogin")) {
				if (json.redirectToLogin) {
					window.location.href = "/login";
				}
			} else {
				let a = [];
				let keys = Object.keys(json);
				for (let i = 0; i < keys.length; i++) {
					a.push({
						path: keys[i],
						id: json[keys[i]]
					})
				}
				next(a);
			}
		})
	}

	render() {
		console.log(this.state);
		if (this.state.fetched) {
			return (
				<div className="sitemap-container">
					<h1 className="sitemap-title">Pages</h1>
					<h4 className="sitemap-help">Choose Page To Edit</h4>
					<div className="sitemap-list">
						{this.state.siteMap.map(this.renderSiteMap)}
					</div>
				</div>
			)
		} else {
			return (
				<div className="admin-panel-loading">
					<h1 className="admin-panel-loading-text">Loading</h1>
						<div class="sk-folding-cube">
							<div class="sk-cube1 sk-cube"></div>
							<div class="sk-cube2 sk-cube"></div>
							<div class="sk-cube4 sk-cube"></div>
							<div class="sk-cube3 sk-cube"></div>
						</div>
				</div>
			)
		}

	}

	renderSiteMap(item, i) {
		let color = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
		let style = {
			"background-image": `linear-gradient(to bottom, white 50%, ${color} 50%)`,
		}
		while (item.path.includes("_")) {
			item.path = item.path.replace("_", "/");
		}
		return (
			<div>
				<Link style={style} className="sitemap-link" to={`page/${item.id}`} key={i}>{item.path}</Link>
			</div>
		)
	}
}
