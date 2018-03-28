import React, { Component } from 'react';
import NavBar from './Navbar';
import '../CSS/PurchasePage.css';

export default class PurchasePage extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      credentials: '',
    };
  }
  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
    console.log(this.state.firstName);
  }

  handleMiddleNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.middleName);
  }

  handleLastNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.lastName);
  }
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }
  handleCredentialChange = (event) => {
    this.setState({ credentials: event.target.value });
    console.log(this.state.credentials);
  }
  selectGoBack = () => {
    this.setState({ username: '' });
    window.location = '/';
  }
  render() {
    return (
      <div className="PurchasePage">
        <NavBar />
        <div className="PurchasePage-title-container">
          <h1> Purchase Loanie here today! </h1>
        </div>
        <br />
        <div className="PurchasePage-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              First Name: <input type="text" name="firstname" onChange={this.handleFirstNameChange} />
              Middle Name: <input type="text" name="middlename" onChange={this.handleMiddleNameChange} />
              Last Name: <input type="text" name="middlename" onChange={this.handleLastNameChange} />
              <br /><br />
              Email: <input type="text" name="email" onChange={this.handleUsernameChange} />
              <br /><br />
              Username: <input type="text" name="username" onChange={this.handleUsernameChange} /><br /><br />
              Password: <input type="text" name="password" onChange={this.handlePasswordChange} /><br /><br />
              Credentials(optional): <input type="text" name="password" onChange={this.handleCredentialChange} /><br /><br />
            </fieldset>
          </form>
          <form>
            <fieldset>
              <legend>Billing information:</legend>
              Credit Card:<br />
              <input type="text" name="creditname" onChange={this.handleUsernameChange} /><br /><br />
              Credit Card Number:<br />
              <input type="text" name="creditnumber" onChange={this.handlePasswordChange} /><br /><br />
              Expiration Date:<br />
              <input type="date" name="expDate" onChange={this.handlePasswordChange} /><br /><br />
            </fieldset>
          </form>
          <form>
            <fieldset>
              <legend>Select Plan:</legend>
              <input type="checkbox" name="creditname" onChange={this.handleUsernameChange} />: 1 Year Subscription - $99.99<br />
              <input type="checkbox" name="creditname" onChange={this.handleUsernameChange} />: 1 Loan - $9.99<br /><br />
            </fieldset>
          </form>
          <button onClick={this.selectGoBack}>Go Back</button>
          <button onClick={this.submitManagerAccountInfo}>Submit</button>
        </div>
      </div>
    );
  }
}
