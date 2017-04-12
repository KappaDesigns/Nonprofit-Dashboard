import React from "react";

export default class AddSlideModal extends React.Component {
	constructor() {
		super();
		this.state = {
			hidden: true
		}
	}

	componentWillMount() {
		this.setState({
			hidden: this.props.hidden
		})
	}

	componentWillReceiveProps(props) {
		this.setState({
			hidden: props.hidden
		})
	}

	render() {
		return (
			<div className={`add-modal ${this.getHiddenState()}`}>
				<div className="modal-header">
					<h3 className="add-header">Add Slide</h3>
					<span onClick={this.props.handleModalClose} className="close-add">X</span>
				</div>
				<div className="modal-body">
					<div className="input" id="input-1">
						<h4 class="input-header">Description</h4>
						<input value={this.props.desc} onChange={this.props.handleDescChange} className="modal-input" type="text" placeholder="description..."/>
					</div>
					<div className="input" id="input-2">
						<h4 class="input-header">Image</h4>
						<input value={this.props.addUrl} onChange={this.props.handleURLChange} className="modal-input" type="text" placeholder="image url..."/>
					</div>
				</div>
				<span onClick={this.props.handleAddSlide} className="add-btn">Add</span>
			</div>
		)
	}

	getHiddenState() {
		if (this.state.hidden) {
      return "";
    } else {
      return "hidden";
    }
	}
}
