import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import { firebase } from './Firebase';
import Navbar from './Navbar';
import axios from 'axios';
import '../CSS/AccountCreate.css';

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('got the ID!!', user.uid);

        // persist signup data so additional info can be added and sent to backend
        sessionStorage.setItem('tokenId', user.uid);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('name', user.displayName);
      });
      window.location = '/new_account';
    },
  },
  // credentialHelper: firebase.auth.CredentialHelper.NONE,
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

export default class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      userType: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  };

  selectStandardUser = () => {
    this.setState({ userType: 'standardUser' });
  };

  selectManagerUser = () => {
    this.setState({ userType: 'managerUser' });
  };

  selectGoBack = () => {
    this.setState({ userType: '' });
  };

  submitClientAccountInfo = () => {
    this.sendToDB();
    window.location = '/my_loans';
  };

  submitManagerAccountInfo = () => {
    this.setState({ userType: '' });
    window.location = '/loan_list';
  };

  handleInputChange = (telNumber, selectedCountry) => {
    console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    this.setState({ phone: telNumber, country: selectedCountry });
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      'Focus off the ReactTelephoneInput component. Tel number entered is: ',
      telNumber,
      ' selected country is: ',
      selectedCountry,
    );
  };

  sendToDB = () => {
    const userInfo = {
      name: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('tokenId'),
      phone: this.state.phone,
      country: this.state.country,
    };
    axios
      .post('http://localhost:3030/create', userInfo)
      .then((res) => {
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Login Failed!', err);
      });
  };

  render() {
    const token = sessionStorage.getItem('tokenId');
    if (token === null || token === undefined || token === '') {
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
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
                Credentials(optional):{' '}
                <input type="text" name="password" onChange={this.handlePasswordChange} />
                <br />
                <br />
                <button onClick={this.submitManagerAccountInfo}>Submit</button>
              </fieldset>
            </form>
            <button onClick={this.selectGoBack}>Go Back</button>
          </div>
        </div>
      );
    }
    if (this.state.userType === 'standardUser') {
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
                Mobile Phone:{' '}
                <ReactTelephoneInput
                  defaultCountry="us"
                  flagsImagePath="./Images/flags.png"
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                />
                <br />
                <br />
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
          <button onClick={this.selectStandardUser}>Client</button>
          <button onClick={this.selectManagerUser}>Loan Officer</button>
        </div>
      </div>
    );
  }
}
