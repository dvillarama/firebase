import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import { writeUserData } from '../helpers/db';

export default class SignUp extends Component {
  constructor(props) {
      super(props);
      this.state = {
            error: null,
            email: '',
            password: '',
            service: '',
          };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      const { email, password, service }  = this.state;
      const result = await signup(email, password);
      const { user } = result;
      writeUserData(user.uid, email, service);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return(
            <div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <h1>
                  Sign Up to
                <Link to="/">Chatty</Link>
                </h1>
                <p>Fill in the form below to create an account.</p>
                <div>
                  <input placeholder="Email" name="email" type="email" onChange={(e) => this.handleChange(e)} value={this.state.email}></input>
                </div>
                <div>
                  <input placeholder="Password" name="password" onChange={(e) => this.handleChange(e)} value={this.state.password} type="password"></input>
                </div>
                <div>
                  <input placeholder="Service" name="service" onChange={(e) => this.handleChange(e)} value={this.state.service}></input>
                </div>
                <div>
                  {this.state.error ? <p>{this.state.error}</p> : null}
                  <button type="submit">Sign up</button>
                </div>
                <hr></hr>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </form>
            </div>
    );
  }
}
