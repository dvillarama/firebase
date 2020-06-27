import React, { Component } from "react";
import { writeUserData, deleteUser } from '../helpers/db';

export default class UserInput extends Component {
  constructor(props) {
    super(props);
    const { service } = this.props.user;
    this.state = {
      localService: service
    };
  }

  handleChange(event) {
    this.modified = true;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onUpdate() {
    const { uid, email } = this.props.user;
    const { localService } = this.state;
    writeUserData(uid, email, localService);
  }

  onDelete() {
    const { uid } = this.props.user;
    deleteUser(uid);
  }

  render() {
    const { uid, email, service } = this.props.user;
    let visibleService = service;
    if (this.modified) {
      const { localService } = this.state;
      visibleService = localService;
    }

    return (
      <li key={uid}>
        <label>
          {email}
        </label>
        <input
        key={uid}
        value={visibleService}
        name="localService"
        onChange={e => {
          this.handleChange(e);
        }}
      />
        <button onClick={e => this.onUpdate(e)}>Update</button>
        <button onClick={e => this.onDelete(e)}>Delete</button>
      </li>
    );
  }
};
