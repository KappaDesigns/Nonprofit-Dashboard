import React from "react";
import crypto from "crypto";
import { secret } from "../../../fConfig";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    }
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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
    })
  }

  componentWillMount() {
    fetch(`/api/user`, {
      method: "get",
      credentials: "same-origin"
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (!json.user.hasOwnProperty("email")) {
        json.user.email = "";
      }
      this.setState({
        original: json,
        username: json.user.username,
        email: json.user.email
      })
    })
  }

  render() {
    return (
      <div className="user-edit-container">
        <div>
          <h1 className="edit-user">Edit User</h1>
          <div className="user-edit">
            <span className="user-label">Username</span><input onChange={this.handleUsername} onClick={this.handleInputClick} className="username-field field" value={this.state.username} type="text"/>
            <br/>
            <span className="password-label">Password</span><input onChange={this.handlePassword} onClick={this.handleInputClick} className="password-field field" value={this.state.password} type="password"/>
            <br/>
            <span className="email-label">Email</span><input onChange={this.handleEmail} onClick={this.handleInputClick} className="email-field field" value={this.state.email} type="text"/>
            <br/>
            <div className="submit-container">
              <button onClick={this.handleUpdate} className="submit">Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      password:e.target.value
    })
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleUpdate(e) {
    crypto.pbkdf2(this.state.password, secret, 100, 512, 'sha512', (err, key) => {
      let data = {
        username: this.state.username != "" ? this.state.username : this.state.original.user.username,
        password: this.state.password != "" ? key.toString("hex") : this.state.original.user.password,
        email: this.state.email != "" ? this.state.email : this.state.original.user.email,
      }
      fetch(`/api/user/${this.state.original.user.username}`, {
        method: "put",
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        window.location.href = "/";
      })
    })
  }

  handleInputClick(e) {
    $('.field').css({
      "border-bottom": "1px solid black"
    })
    let color = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    e.target.style.borderBottomColor = color;
    e.target.style.borderBottomWidth = "3px"
  }
}
