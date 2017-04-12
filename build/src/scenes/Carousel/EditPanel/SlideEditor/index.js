import React from "react";
import DescEditor from "./DescEditor/index";
import RemoveSlideButton from "./RemoveSlideButton/index";
import BackgroundImageModal from "./BackgroundImageModal/index";
import AddSlideButton from "./AddSlideButton/index";
import AddSlideModal from "./AddSlideModal/index";

export default class SlideEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			displayAddModal: false,
			slide:{},
			addDesc: "",
			addUrl: "",
		}
		this.handleAddBtn = this.handleAddBtn.bind(this);
		this.handleAddModalClose = this.handleAddModalClose.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleAddUrlChange = this.handleAddUrlChange.bind(this);
		this.handleAddSlide = this.handleAddSlide.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			slide: this.props.slide,
			addSlide: this.props.handleAddSlide,
		})
	}

	componentWillReceiveProps(props) {
		this.setState({
			slide: props.slide
		})
	}

	render() {
		return (
			<div className="slide-editor">
				<div onDoubleClick={this.handleDoubleClick} style={this.props.customStyle} className="carousel-display">
					<DescEditor handleDescEdit={this.props.handleDescEdit} slide={this.state.slide}></DescEditor>
					<RemoveSlideButton handleSlideRemove={this.props.handleSlideRemove}></RemoveSlideButton>
					<BackgroundImageModal handleModalClose={this.props.handleURLModalClose} slide={this.state.slide} handleURLChange={this.props.handleURLChange}></BackgroundImageModal>
					<AddSlideModal hidden={this.state.displayAddModal} desc={this.state.addDesc} addUrl={this.state.addUrl}
					handleAddSlide={this.handleAddSlide} handleModalClose={this.handleAddModalClose}
					handleDescChange={this.handleDescChange} handleURLChange={this.handleAddUrlChange}>
					</AddSlideModal>
				</div>
				<AddSlideButton handleClick={this.handleAddBtn}></AddSlideButton>
			</div>
		)
	}

	handleAddModalClose() {
		this.setState({
			displayAddModal: false
		})
	}

	handleDoubleClick() {
    let slide = this.state.slide;
    slide.isHidden = !slide.isHidden;
    this.setState({
			displayAddModal: false,
      slide: slide
    })
  }

	handleAddSlide() {
		this.addSlide(this.state.addUrl, this.state.addDesc, this.state.addSlide)
	}

	addSlide(url, desc, next) {
		let valid = url != "" && desc
		console.log(next, url, desc);
		return next(url, desc, valid)
	}

	handleAddModalClose() {
    this.setState({
      displayAddModal: false
    })
  }

	handleAddUrlChange(e) {
    this.setState({
      addUrl:e.target.value
    })
  }

  handleDescChange(e) {
    this.setState({
      addDesc:e.target.value
    })
  }

	handleAddBtn() {
		let slide = this.state.slide;
		slide.isHidden = true;
		this.setState({
			slide: slide,
			displayAddModal: true
		})
	}
}
