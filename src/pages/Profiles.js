import React, { Component } from 'react';
import { db } from '../services/firebase';

export default class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    }
  }

  componentDidMount() {
    const usersDb = db.ref('users/');
    usersDb.on('child_added', (data) => {
      console.log({data});
    });

    usersDb.once('value', (snap) => {
      console.log({snap});
    });

    usersDb.on('child_changed', (data) => {
      console.log({data});
    });
    const users = usersDb.limitToLast(100);
    console.log({users});
    // usersDb.onCreate((data) => {
      // console.log({data});
    // });

    // usersDb.onUpdate((data) => {
      // console.log({data});
    // });

    const dbRef = db.ref();
    const userRef = dbRef.child('users');
    userRef.on('child_added', (snapshot) => {
      console.log({snapshot});
    });

    console.log('mounted');
  }

  render() {
    const { profiles } = this.state;
    const listOfProfiles = profiles.map((p) => <li key={p.username}>{p.username}</li>);

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
