import React, { Component } from 'react';
import './App.css';

import { auth } from './services/firebase';
import { firestore } from './services/firebase';
import { writeUserData } from './helpers/db';

import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profiles from './pages/Profiles';
import Menu from './components/Menu';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      email: ''
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          email: user.email,
          uid: user.uid,
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  handleClickTest() {
    const { uid, email } = this.state;
    firestore.collection("users").doc(uid).set({
      first: "email",
      last: "Lovelace",
      born: 1815
    })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { authenticated, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Router>
          <Menu authenticated={authenticated} email={email} />
          <div onClick={(e) => this.handleClickTest(e)}>test click</div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" >
              {authenticated ? <Redirect to="/" /> : <Login/>}
            </Route>
            <Route path="/signup" >
              {authenticated ? <Redirect to="/" /> : <SignUp/>}
            </Route>
            <Route path="/profiles" >
              <Profiles authenticated={authenticated} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
