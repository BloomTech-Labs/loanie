import React, { Component } from 'react';
import { firebase } from './Firebase';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  };

  submitPasswordReset = () => {
    // const actionCodeSettings = {
    //   url: `https://www.example.com/?email=${firebase.auth().currentUser.email}`,
    //   handleCodeInApp: true,
    // };
    console.log('submit reset request');
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    window.location = '/password_code';
  };

  render() {
    return (
      <form>
        <fieldset>
          <legend>Reset your password</legend>
          Enter your email: <input type="text" name="email" onChange={this.handleEmailInput} />
          <br />
          <br />
          <button onClick={this.submitPasswordReset}>Submit</button>
        </fieldset>
      </form>
    );
  }
}
