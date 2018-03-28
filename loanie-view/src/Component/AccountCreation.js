import React, { Component } from 'react';
import Navbar from './Navbar';
import '../CSS/AccountCreate.css';

export default class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      userType: '',
    };
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }
  selectStandardUser = () => {
    this.setState({ userType: 'standardUser' });
  }
  selectManagerUser = () => {
    this.setState({ userType: 'managerUser' });
  }
  selectGoBack = () => {
    this.setState({ userType: '' });
  }
  submitClientAccountInfo = () => {
    this.setState({ userType: '' });
    window.location = '/my_loans';
  }
  submitManagerAccountInfo = () => {
    this.setState({ userType: '' });
    window.location = '/loan_list';
  }
  render() {
    if (this.state.userType === 'managerUser') {
      return (
        <div className="Login">
          <Navbar />
          <div className="Login-header-container">
            <h1> Manager Account Creation Page</h1>
          </div>
          <div>
            <form>
              <fieldset>
                <legend>Personal information:</legend>
                First Name: <input type="text" name="firstname" onChange={this.handleUsernameChange} />
                Middle Name: <input type="text" name="middlename" onChange={this.handleUsernameChange} />
                Last Name: <input type="text" name="middlename" onChange={this.handleUsernameChange} />
                <br /><br />
                Email: <input type="text" name="email" onChange={this.handleUsernameChange} />
                <br /><br />
                Username: <input type="text" name="username" onChange={this.handleUsernameChange} /><br /><br />
                Password: <input type="text" name="password" onChange={this.handlePasswordChange} /><br /><br />
                Credentials(optional): <input type="text" name="password" onChange={this.handlePasswordChange} /><br /><br />
                <button onClick={this.submitManagerAccountInfo}>Submit</button>
              </fieldset>
            </form>
            <button onClick={this.selectGoBack}>Go Back</button>
          </div>
        </div>
      );
    } else if (this.state.userType === 'standardUser') {
      return (
        <div className="Login">
          <Navbar />
          <div className="Login-header-container">
            <h1> Standard Account Creation Page</h1>
          </div>
          <div>
            <form>
              <fieldset>
                <legend>Personal information:</legend>
                First Name: <input type="text" name="firstname" onChange={this.handleUsernameChange} />
                Middle Name: <input type="text" name="middlename" onChange={this.handleUsernameChange} />
                Last Name: <input type="text" name="middlename" onChange={this.handleUsernameChange} />
                <br /><br />
                Email: <input type="text" name="email" onChange={this.handleUsernameChange} />
                <br /><br />
                Username: <input type="text" name="username" onChange={this.handleUsernameChange} /><br /><br />
                Password: <input type="text" name="password" onChange={this.handlePasswordChange} /><br /><br />
                <button onClick={this.submitClientAccountInfo}>Submit</button>
              </fieldset>
            </form>
            <button onClick={this.selectGoBack}>Go Back</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="Login-header-container">
          <h1> Select User Type </h1>
        </div>
        <div>
          <button onClick={this.selectStandardUser}>Standard User</button>
          <button onClick={this.selectManagerUser}>Manager User</button>
        </div>
      </div>
    );
  }
}
