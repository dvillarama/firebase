import React, { Component } from "react";
import { firestore } from "../services/firebase";
import UserInput from "../components/UserInput";

export default class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: {}
    };
  }

  componentDidMount() {
    firestore.collection("users").onSnapshot(snapshot => {
      const { profiles } = this.state;
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added" || change.type === "modified") {
          const { uid, email, service } = change.doc.data();
          profiles[uid] = { email, service, uid };
        }
        if (change.type === "removed") {
          const { uid } = change.doc.data();
          delete profiles[uid];
        }
      });
      this.setState({ profiles });
    });
  }

  render() {
    const { profiles } = this.state;
    const { currUid } = this.props;
    let listOfProfiles;

    listOfProfiles = Object.keys(profiles).map(k => {
      const { uid } = profiles[k];
      return (
        <UserInput
        key={uid}
        user={profiles[k]}
        currUid={currUid}
        getUser={() => {
          return { ...profiles[k] };
        }}
      />
      );
    });

    return <div>{listOfProfiles}</div>;
  }
}
