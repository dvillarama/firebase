import React, { Component } from "react";
import { signout } from "../helpers/auth";

import { Link } from "react-router-dom";

export default class Menu extends Component {
  handleClick(event) {
    signout();
  }

  render() {
    const { authenticated, email } = this.props;
    let authYes = <p></p>;
    if (authenticated) {
      authYes = <p>{email}</p>;
    }
    return (
      <div>
        {authYes}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
          <li>
            <span onClick={e => this.handleClick(e)}>Sign Out</span>
          </li>
        </ul>
      </div>
    );
  }
}
