import React from "react";

export default class History extends React.Component {
  render() {
    let time = new Date().valueOf();
    return (
      <div className="dashboard-component" id="history">
        <h1>Recent Changes</h1>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
        <div className="history-row" id={time}>
          <img className="user-icon" src="https://avatars2.githubusercontent.com/u/2331200?v=3&s=88" alt=""/>
          <span className="edit"><i class="fa fa-picture-o fa-1x"></i> Page [Home] edited by User</span>
          <span className="edit-date">{new Date(time).toDateString()}</span>
          <span className="note">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        </div>
      </div>
    )
  }
}
