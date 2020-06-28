import React, { Component } from "react";
import { writeUserData, deleteUser } from "../helpers/db";

export default class UserInput extends Component {
  constructor(props) {
    super(props);
    const { service } = this.props.user;
    this.state = {
      localService: service,
      modified: false
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      modified: true
    });
  }

  onUpdate() {
    const { uid, email } = this.props.user;
    const { localService } = this.state;
    writeUserData(uid, email, localService);
    this.setState({ modified: false });
  }

  onDelete() {
    const { uid } = this.props.user;
    deleteUser(uid);
  }

  render() {
    const { uid, email, service } = this.props.user;
    const { currUid } = this.props;
    let visibleService = service;
    const { modified, localService } = this.state;
    const disabled = (uid === currUid) ? "" : "disabled";
    if (modified) {
      visibleService = localService;
    }

    return (
      <div className="profileRow">
        <div className="item">
          <label className="profileEmail">{email}</label>
        </div>
        <div className="item">
          <input
            className={disabled}
            key={uid}
            value={visibleService}
            name="localService"
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <button className={disabled} onClick={e => this.onUpdate(e)}>
            Update
          </button>
          <button className={disabled} onClick={e => this.onDelete(e)}>
            Delete
          </button>
        </div>
        <div className="item" />
      </div>
    );
  }
}
