import React from "react";
import { secret } from "../../../fConfig";
import "whatwg-fetch";
import crypto from "crypto";

export default class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				username: "",
				password: "",
				passwordConfirm: "",
				email:""
			}
		}
		this.handleField = this.handleField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.isAuth();
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

	render() {
		return (
			<div className="register-container">
				<h1 className="register-header">Register User</h1>
				<div className="register-form">
					<h1>Form</h1>
					<span className="label username">Username</span>
					<input onChange={this.handleField} value={this.state.form.username} type="text" className="field" id="username-field"/>
					<br/>
					<span className="label password">Password</span>
					<input onChange={this.handleField} value={this.state.form.password} type="password" className="field" id="password-field"/>
					<br/>
					<span className="label password-confirm">Confirm Password</span>
					<input onChange={this.handleField} value={this.state.form.passwordConfirm} type="password" className="field" id="password-confirm-field"/>
					<br/>
					<span className="email label">Email</span>
					<input onChange={this.handleField} value={this.state.form.email} type="text" className="field" id="email-field"/>
					<br/>
					<br/>
					<button onClick={this.handleSubmit} className="submit">Submit</button>
				</div>
			</div>
		)
	}

	handleField(e) {
		let parts = e.target.id.split("-");
		let key = "";
		for (let i = 0; i < parts.length - 1; i++) {
			if (i == 0) {
				key += parts[i];
			} else {
				let toCapitalize = parts[i].substring(0,1).toUpperCase();
				let str = parts[i].substring(1, parts[i].length);
				key += (toCapitalize + str);
			}
		}
		let form = this.state.form;
		form[key] = e.target.value;
		this.setState({
			form: form
		})
	}

	handleSubmit(e) {
		fetch(`/api/exists/${this.state.form.username}`, {
			credentials: "same-origin"
		})
		.then(res => {
			return res.json();
		})
		.then(json => {
			if (json.hasOwnProperty("exists")) {
				console.log(json);
				if (!json.exists) {
					crypto.pbkdf2(this.state.form.password, secret, 100, 512, 'sha512', (err, key) => {
						if (err) {
							return console.log(err);
						}
						let form = this.state.form;
						delete form.passwordConfirm;
						form.password = key.toString("hex");
						fetch(`/api/user/`, {
							method: "post",
							headers: {
								'Accept': 'application/json',
			          			'Content-Type': 'application/json'
							},
							body: JSON.stringify(form)
						})
					})
				}
			}
		})
	}
}
