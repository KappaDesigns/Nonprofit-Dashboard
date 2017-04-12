import React from "react";

export default class DescEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			slide: {}
		}
	}

	componentWillMount() {
		this.setState({
			slide: this.props.slide
		})
	}

	componentWillReceiveProps(props) {
		this.setState({
			slide: props.slide
		})
	}

	render() {
		return (
			<div className="desc-container">
				<textarea onChange={this.props.handleDescEdit} value={this.state.slide.desc} className="desc" type="text"></textarea>
			</div>
		)
	}
}
