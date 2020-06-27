import React, { Component } from "react";
import { signOut } from "../helpers/auth";

import { Link } from "react-router-dom";

export default class Menu extends Component {
  handleClick(event) {
    signOut();
  }

  renderAuthenticated() {
    const { email } = this.props;
    return (
      <div className="mainNav">
        <div className="leftNav">
          <Link to="/">Profiles</Link>
        </div>
        <div className="rightNav avatar">
          <span className="email">{email}</span>
          <span className="signOut" onClick={e => this.handleClick(e)}>Sign Out</span>
        </div>
      </div>
    )
  }

  renderUnauthenticated() {
    return (
      <div className="mainNav">
        <div className="leftNav">
          <Link to="/">Profiles</Link>
        </div>

        <div className="rightNav">
          <Link to="/login">Login</Link>/
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    )
  }

  render() {
    const { authenticated } = this.props;
    if (authenticated) {
      return this.renderAuthenticated();
    }
    return this.renderUnauthenticated();
  }
}
