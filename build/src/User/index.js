import React from "react";

export default class User extends React.Component {
  render() {
    return (
      <div>User {this.props.params.id}</div>
    )
  }
}
