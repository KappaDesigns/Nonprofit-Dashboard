import React from "react";
import "whatwg-fetch";
import crypto from "crypto";
import { secret } from "./secret";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      subredditOptions: ["Earth", "Village"],
      imageUrls: [],
      username: "",
      password: ""
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let self = this;
    let subrdt = this.state.subredditOptions[Math.floor(Math.random() * this.state.subredditOptions.length)];
    $.getJSON("http://www.reddit.com/r/"+subrdt+"Porn/hot/.json?jsonp=?", function(data) {
      let total = data.data.children.length;
      for (let i = 0; i < total; i++) {
        let url = data.data.children[i].data.url;
        if (url.includes("png") || url.includes("jpg")) {
          self.state.imageUrls.push(url);
        }
      }
      total = self.state.imageUrls.length;
      let index = Math.floor(Math.random() * total);
      self.setState({
        url: self.state.imageUrls[index]
      })
    });
  }

  render() {
    let style = {
      main: {
        backgroundImage: "url(" + this.state.url + ")",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      },
      fb: {
        backgroundImage: 'url("https://c2.staticflickr.com/6/5561/14892464329_0342277ca1_k.jpg")'
      }
    }
    return (
      <div>
        <div style={style.fb} className="fall-back"></div>
        <div style={style.main} className="login-container">
          <div className="login-modal">
            <form onSubmit={this.handleSubmit}>
              <h1 className="login-header">Admin Login</h1>
              <h3 className="username-header">Username</h3>
              <input onChange={this.handleUsername} value={this.state.username} type="text" className="login-input username"/>
              <h3 className="password-header">Password</h3>
              <input onChange={this.handlePassword} value={this.state.password} type="password" className="login-input password"/>
              <br/>
              <button className="submit">Submit</button>
            </form>
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
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    crypto.pbkdf2(this.state.password, secret, 100, 512, 'sha512', (err, key) => {
      if (err) {
        throw err;
      }
      fetch(`/api/login`, {
        method: "post",
        body: JSON.stringify({
          username: this.state.username,
          password: key.toString("hex")
        }),
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        return res.json();
      }).then((json) => {
        if (json.hasOwnProperty("login")) {
          window.location.href="/"
        }
      })
    })
  }
}
