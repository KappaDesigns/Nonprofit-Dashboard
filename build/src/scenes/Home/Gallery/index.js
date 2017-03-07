import React from "react";
import { Link } from "react-router";

export default class Gallery extends React.Component {
	constructor() {
		super();
		this.state = {
			length: 0,
			images: [
				{
					id: 0,
					src: "https://68.media.tumblr.com/1e27b1c53d871a9601fa7071b6e78e67/tumblr_inline_nynb8wVZII1rib5xn_540.jpg"
				},
				{
					id: 1,
					src: "https://68.media.tumblr.com/1e27b1c53d871a9601fa7071b6e78e67/tumblr_inline_nynb8wVZII1rib5xn_540.jpg"
				},
				{
					id: 2,
					src: "https://68.media.tumblr.com/1e27b1c53d871a9601fa7071b6e78e67/tumblr_inline_nynb8wVZII1rib5xn_540.jpg"
				}
			]
		}
		this.renderImages = this.renderImages.bind(this);
	}

	renderImages(image) {
		let translateInc = -(20 * (image.id + 1)) - 150;
		console.log(translateInc, image.id);
		let style = {
			transform: `translateX(${translateInc});`
		}
		return (
			<img style={style} key={image.id} src={image.src} alt="1" className="gallery-img" id={`gallery-${image.id}`}/>
		)
	}

	render() {
		return (
			<Link className="dashboard-component" id="gallery">
				<h1 className="gallery-title">Gallery</h1>
				<div className="gallery-container">
					{this.state.images.map(this.renderImages)}
				</div>
			</Link>
		)
	}
}
