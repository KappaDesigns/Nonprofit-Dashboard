import React from "react";

export default class BackgroundImageModal extends React.Component {
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
			<div className={`image-change-container ${this.getHiddenState()}`}>
				<div className="modal-header">
					<h3 className="background-header">Change Background URL</h3>
					<span onClick={this.props.handleModalClose}  className="close-background">X</span>
				</div>
				<input value={this.state.slide.src} onChange={this.props.handleURLChange} className="background-url" type="text" placeholder="url..."/>
			</div>
		)
	}

	getHiddenState() {
    if (this.state.slide.isHidden) {
      return "hidden";
    } else {
      return "";
    }
  }
}
