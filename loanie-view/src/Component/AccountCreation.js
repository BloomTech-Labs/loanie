import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
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
      userType: '',
      phoneNumber: '',
      acceptText: false,
      acceptEmail: false,
      invalidPhoneNumber: false,
      invalidCheckBoxSelection: false,
    };
    console.log(this.state);
  }

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
    this.sendToDB();
    window.location = '/loan_list';
  };
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleInputChange = (event) => {
    const contactNo = event.target.value.substring(0, 10);
    this.setState({ phoneNumber: contactNo });
  };

  handleTextAlerts = () => {
    this.setState({ acceptText: !this.state.acceptText });
    console.log(!this.state.acceptText);
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmail: !this.state.acceptEmail });
    console.log(!this.state.acceptEmail);
  };

  sendToDB = () => {
    const userInfo = {
      name: sessionStorage.getItem('name'),
      userType: this.state.userType,
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('tokenId'),
      mobilePhone: this.state.phoneNumber,
      acceptTexts: this.state.acceptText,
      acceptEmails: this.state.acceptEmail,
      password: this.state.password,
    };
    sessionStorage.setItem('userType', this.state.userType);
    console.log('sending to db:', userInfo);
    axios
      .post('http://localhost:3030/newuser', userInfo)
      .then((res) => {
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Creation Failed!', err);
      });
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
    if (this.state.userType === 'managerUser') {
      return (
        <div className="Login">
          <Navbar />
          <div className="Login-header-container">
            <h1> Loan Officer Account Creation</h1>
          </div>
          <div>
            <form>
              <fieldset>
                <legend>Additional information:</legend>
                Credentials(optional):{' '}
                <input type="text" name="password" onChange={this.handlePasswordChange} />
                <br />
                <br />
                Mobile Phone:{' '}
                <input
                  type="text"
                  onChange={this.handleInputChange}
                />
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
            <h1> Client Account Creation</h1>
          </div>
          <div>
            <form>
              <fieldset>
                <legend>Additional information:</legend>
                Mobile Phone:{' '}
                <input
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.handleInputChange}
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
            <button onClick={this.selectGoBack}>Go Back</button>
          </div>
        </div>
      );
    }
    if (!sessionStorage.getItem('userType')) {
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
    if (sessionStorage.getItem('userType') === 'managerUser') {
      window.location = '/loan_list';
      return (
        <div>
          <h1> Logged In </h1>
        </div>
      );
    }
    window.location = '/my_loans';
    return (
      <div>
        <h1> Logged In </h1>
      </div>
    );
  }
}

export default AccountCreation;
