import React, { Component } from 'react';
import { firestore } from '../services/firebase';
import UserInput from '../components/UserInput';

export default class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: {}
    }
  }

  componentDidMount() {
    firestore.collection("users")
      .onSnapshot((snapshot) => {
        const { profiles }= this.state;
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added" || change.type === "modified") {
            const { uid, email, service } = change.doc.data();
            profiles[uid] = { email, service, uid };
          }
        });
        this.setState({profiles});
      });
  }

  render() {
    const { profiles } = this.state;
    const { authenticated } = this.props;
    let listOfProfiles;

    if ( authenticated) {
      listOfProfiles = Object.keys(profiles).map( (k) => {
        const { uid, email, service } = profiles[k];
        return <UserInput key={uid} user={profiles[k]} getUser={ () => { return {...profiles[k]}}}/>;
      });
    } else {
      listOfProfiles = Object.keys(profiles).map( (k) => {
        const { uid, email, service } = profiles[k];
        return <li>{email} {service}</li>
      });
    }

    return(
      <div>
        <div>Profiles</div>
        <ol>
            { listOfProfiles }
        </ol>
      </div>
    );
  }
}
