import React from "react";
import "whatwg-fetch";
import Event from "./Event";
import DatePicker from "react-datepicker";
import moment from "moment";
import jQuery from "jquery";

export default class EventEditor extends React.Component {

    constructor() {
        super();
        this.state = {
			fetched: false,
			style: {
				display: 'none',
			},
			form: {
				title: '',
				desc: '',
				date: moment(new Date()),
				link: '',
				src: '',
			}
        }
		this.isAuth();
		this.displayContainer = this.displayContainer.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleDesc = this.handleDesc.bind(this);
		this.handleLink = this.handleLink.bind(this);
		this.handleSrc = this.handleSrc.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
    }

    isAuth() {
		fetch(`/api/authenticated`, {
			method: "post",
			credentials: "same-origin"
		})
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			if (!json.isAuthenticated) {
				window.location.href = "/login";
				return;
			}
		});
	}

	componentWillMount() {
		fetch('/api/event', {
			method: 'get',
			credentials: "same-origin",
		}).then((data) => {
			return data.json();
		}).then((json) => {
			console.log(json);
			this.setState({
				fetched: true,
				events: json,
			});
		}).catch((e) => {
			console.log(e);
		});
	}

    render() {
		if (!this.state.fetched) {
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
			);
		} else {
			return (
				<div className="event-background">
					<div className="event-container">
						<h1 className="header">Events</h1>
						<div className="add">
							<div onClick={this.displayContainer} className="circle">
								<span className="plus">+</span>
							</div>
							<div className="add-container">
								<h1 className="title">Create Event</h1>
								<label className="label" htmlFor="input-1">Title</label>
								<input onChange={this.handleTitle} value={this.state.form.title} type="text" className="edit-input" id="input-1"/>
								<br/>
								<label className="label" htmlFor="input-2">Desc</label>
								<input onChange={this.handleDesc} value={this.state.form.desc} type="text" className="edit-input" id="input-2"/>
								<br/>
								<label className="label" htmlFor="input-3">Link</label>
								<input onChange={this.handleLink} value={this.state.form.link} type="text" className="edit-input" id="input-3"/>
								<br/>
								<label className="label" htmlFor="input-4">Image</label>
								<input onChange={this.handleSrc} value={this.state.form.src} type="text" className="edit-input" id="input-4"/>
								<img src={this.state.form.src} alt="test" className="preview"/>
								<br/>
								<span className="label">Date</span>
								<br/>
								<DatePicker selected={this.state.form.date} className="edit-input" onChange={this.handleDate}/>
								<br/>
								<a onClick={this.handleSubmit} className="submit">Create</a>
							</div>
						</div>
						<div className="events-contain">
							<h1 className="head">Edit Events</h1>
							<div className="events">
								{
									this.state.events.map((event) => {
										return <Event key={event._id} event={event}/>
									})
								}
							</div>
						</div>
					</div>
				</div>
        	);
		}
	}

	handleTitle(e) {
		let form = this.state.form;
		form.title = e.target.value;
		this.setState({
			form: form,
		});
	}
	
	handleDesc(e) {
		let form = this.state.form;
		form.desc = e.target.value;
		this.setState({
			form: form,
		});
	}

	handleLink(e) {
		let form = this.state.form;
		form.link = e.target.value;
		this.setState({
			form: form,
		});
	}

	handleSrc(e) {
		let form = this.state.form;
		form.src = e.target.value;
		this.setState({
			form: form,
		});
	}

	handleDate(date) {
		let form = this.state.form;
		form.date = date;
		this.setState({
			form: form,
		});
	}

	handleSubmit() {
		let body = JSON.stringify({
            title: this.state.form.title,
            desc: this.state.form.desc,
            link: this.state.form.link,
            src: this.state.form.src,
            date: this.state.form.date,
        });
		fetch(`/api/event/`, {
            credentials: 'same-origin',
            method: 'POST',
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
	
	displayContainer() {
		let style = this.state.style;
		style.display = style.display == 'none' ? 'block' : 'none';
		if (style.display == 'none') {
			this.rotate(0)
			jQuery('.add-container').slideUp(500);
		} else {
			this.rotate(45)
			jQuery('.add-container').slideDown(500);
		}
	}

	rotate(deg) {
		jQuery('.circle').css({
			transition: '0.5s all ease',
			transform: `rotate(${deg}deg)`,
		});
	}
}