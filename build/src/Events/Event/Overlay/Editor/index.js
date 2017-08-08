import React from "react";
import "whatwg-fetch";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class Editor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            startDate: moment(props.event.date),
            title: props.event.title,
            src: props.event.backgroundImage,
            desc: props.event.desc,
            link: props.event.link,
            src: props.event.src,
            style: {
                opacity: 0,
                display: 'none',
            }
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    render() {
        return (
            <div className="editor">
                <span onClick={this.props.handleClose} className="close">X</span>
                <div className="update">
                    <h1 className="title">Edit Event</h1>
                    <label className="label" htmlFor="input-1">Title</label>
                    <input onChange={this.handleTitle} value={this.state.title} type="text" className="edit-input" id="input-1"/>
                    <br/>
                    <label className="label" htmlFor="input-2">Desc</label>
                    <input onChange={this.handleDesc} value={this.state.desc} type="text" className="edit-input" id="input-2"/>
                    <br/>
                    <label className="label" htmlFor="input-3">Link</label>
                    <input onChange={this.handleLink} value={this.state.link} type="text" className="edit-input" id="input-3"/>
                    <br/>
                    <label className="label" htmlFor="input-4">Image</label>
                    <input onChange={this.handleBackgroundChange} value={this.state.src} type="text" className="edit-input" id="input-4"/>
                    <img src={this.state.src} alt="test" className="preview"/>
                    <br/>
                    <span className="label">Date</span>
                    <br/>
                    <DatePicker selected={this.state.startDate} className="edit-input" onChange={this.handleDateChange}/>
                    <br/>
                    <div className="flex">
                        <a onClick={this.handleSubmit} className="submit">Submit</a>
                        <a onClick={this.showModal} className="submit red">Delete Event</a>
                    </div>
                    <div style={this.state.style} className="modal">
                        <br/>
                        <br/>
                        <br/>
                        <h1>Are You Sure You Want To Delete This Event</h1>
                        <div className="flex">
                            <a onClick={this.hideModal} className="submit white">Cancel</a>
                            <a onClick={this.delete} className="submit red">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    delete() {
        fetch(`/api/event/${this.props.event._id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
        }).then((data) => {
            return data.json();
        }).then((json) => {
            window.location.href = window.location.href;
        })
    }

    hideModal() {
        let style = this.state.style;
        style.opacity = 0;
        style.display = 'none';
        this.setState({
            style: style,
        });
    }

    showModal() {
        let style = this.state.style;
        style.opacity = 1;
        style.display = 'block';
        this.setState({
            style: style,
        });
    }

    handleSubmit() {
        let body = JSON.stringify({
            title: this.state.title,
            desc: this.state.desc,
            link: this.state.link,
            src: this.state.src,
            date: this.state.startDate,
        });
        console.log(this.props.event._id);
        fetch(`/api/event/${this.props.event._id}`, {
            credentials: 'same-origin',
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((data) => {
            return data.json();
        }).then((json) => {
            window.location.href = window.location.href
        })
    }

    handleTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleDesc(e) {
        this.setState({
            desc: e.target.value,
        });
    }

    handleLink(e) {
        this.setState({
            link: e.target.value,
        });
    }

    handleBackgroundChange(e) {
        this.setState({
            src: e.target.value,
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate:date,
        });
    }
}