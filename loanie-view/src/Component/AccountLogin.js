import React, { Component } from 'react';
import Navbar from './Navbar';
import '../CSS/AccountLogin.css';

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
      <div className="container AccountLogin">
        <Navbar />
        <div>
          <form className="form-horizontal">
            <fieldset>
              <div className="Account-title-containter">
                <legend className>Sign in</legend>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="username">Username:</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control " name="username" placeholder="Enter username" onChange={this.handleUsernameChange} />
                </div>
              </div>
              <div className="form-group" >
                <label className="control-label col-sm-2" htmlFor="username">Password:</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="username" placeholder="Enter password" onChange={this.handlePasswordChange} />
                </div>
              </div>
            </fieldset>
          </form>
          <div className="Account-button-container">
            <button className="Account-button" onClick={this.handleUserLogin}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
