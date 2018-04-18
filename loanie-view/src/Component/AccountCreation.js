import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import axios from 'axios';
import base from './base';
import firebase from './Firebase';
import Navbar from './Navbar';
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

class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      email: sessionStorage.getItem('email'),
      name: sessionStorage.getItem('name'),
      phone: '',
      userType: 'standardUser',
      acceptText: false,
      acceptEmail: false,
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  submitClientAccountInfo = () => {
    this.sendToDB();
    window.location = '/my_loans';
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleInputChange = (telNumber, selectedCountry) => {
    console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    this.setState({ phone: telNumber });
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      'Focus off the ReactTelephoneInput component. Tel number entered is: ',
      telNumber,
      ' selected country is: ',
      selectedCountry,
    );
  };

  handleTextAlerts = () => {
    this.setState({ acceptText: !this.state.acceptText });
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmail: !this.state.acceptEmail });
  };

  sendToDB = () => {
    const userInfo = {
      name: this.state.name,
      userType: this.state.userType,
      email: this.state.email,
      token: this.state.tokenId,
      mobilePhone: this.state.phone,
      acceptTexts: this.state.acceptText,
      acceptEmails: this.state.acceptEmail,
      password: this.state.password,
    };
    sessionStorage.setItem('userType', this.state.userType);
    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/newuser`, userInfo)
      .then((res) => {
        console.log('Response from server: ', res);
        // window.location = '/my_loans';
      })
      .catch((err) => {
        throw err;
      });
    // window.location = '/my_loans';
  };

  render() {
    const token = sessionStorage.getItem('tokenId');
    if (token === null || token === undefined || token === '') {
      return (
        <div>
          <Navbar />
          <div className="Account-title-containter">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>
      );
    }
    if (sessionStorage.getItem('userType') === 'managerUser') {
      window.location = '/loan_list';
      return (
        <div>
          <h1> Logged In </h1>
        </div>
      );
    }
    if (sessionStorage.getItem('userType') === 'standardUser') {
      console.log('standardUser redirect!');
      window.location = '/my_loans';
      return (
        <div>
          <h1> Logged In </h1>
        </div>
      );
    }
    if (this.state.userType) {
      return (
        <div className="Create">
          <Navbar />
          <div className="Create-title-containter">
            <h1> Client Account Creation</h1>
          </div>
          <div>
            <form className="Create-form-container">
              <fieldset>
                <legend>Additional information:</legend>
                Mobile Phone:{' '}
                <ReactTelephoneInput
                  defaultCountry="us"
                  flagsImagePath="\Images\flags.png"
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                />
                <br />
                <br />
                <input type="checkbox" name="acceptText" onChange={this.handleTextAlerts} /> I would
                like to recieve TEXT notifications about my loan<br />
                <input type="checkbox" name="acceptEmail" onChange={this.handleEmailAlerts} /> I
                would like to recieve EMAIL notifications about my loan<br />
                <br />
                <button onClick={this.submitClientAccountInfo}>Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AccountCreation;
