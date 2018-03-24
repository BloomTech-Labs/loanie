import React, { Component } from 'react';
import Navbar from './Navbar';
import '../CSS/AccountCreate.css';

export default class AccountLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }
  handleUserLogin() {
    this.setState({ username: 'test' });
    window.location = '/loan_list';
  }
  render() {
    return (
      <div className="Login">
        <Navbar />
        <div>
          <h1 className="Login-header-container"> Welcome to Account Login Page</h1>
        </div>
        <div>
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              Username:<br />
              <input type="text" name="username" onChange={this.handleUsernameChange} /><br /><br />
              Password:<br />
              <input type="text" name="password" onChange={this.handlePasswordChange} /><br /><br />
            </fieldset>
          </form>
          <button onClick={this.handleUserLogin}>Submit</button>
        </div>
      </div>
    );
  }
}
