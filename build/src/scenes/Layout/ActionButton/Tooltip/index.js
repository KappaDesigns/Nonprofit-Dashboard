import React from "react";

export default class Tooltip extends React.Component {
	render() {
		let index = this.props.action.substring(7,8);
		let dY = (-80 * index) - 16;
		let id = `${this.props.action}-tooltip`;
		let tooltipID = `${this.props.action}-tooltip-right`;
		let containerID = `${this.props.customID}-container-tooltip`
		let customID = this.props.customID;
		let self = this;
		setTimeout(function () {
			$(`#${id}`).css({
				transition: "all 0.5s ease",
				transform: `translateY(${dY}px)`
			})
			$(`#${tooltipID}`).css({
				transition: "all 0.5s ease",
				transform: `translateY(${dY - 10}px)`
			})
			$(`#${customID}`).mouseenter(function () {
				console.log("in");
				$(`#${containerID}`).fadeIn();
			});
			$(`#${customID}`).mouseleave(function () {
				console.log("out");
				$(`#${containerID}`).fadeOut();
			});
		}, 200);
		return (
			<div id={containerID} className="action-tooltip-container">
				<span id={id} className="action-tooltip">{this.props.tooltip}</span>
				<span id={tooltipID} className="tooltip-right"></span>
			</div>
		)
	}
}
