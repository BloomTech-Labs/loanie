import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import { firebase } from './Firebase';
import { connect } from 'react-redux';
import { getUserLoginDetails } from '../Actions';
import '../CSS/AccountLogin.css';

class AccountLogin extends Component {

  sendToken = (tokenId, sendEmail) => {
    // setter
    sessionStorage.setItem('tokenId', tokenId);
    sessionStorage.setItem('email', sendEmail);

    console.log('Inside sendToken(), this.props: ', this.props);

    console.log('sending token to server!');
    const data = { token: tokenId, email: sendEmail };
    let userType = '';
    axios
      .post('http://localhost:3030/auth', data)
      .then((res) => {
        userType = res.userType;
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Login Failed!', err);
      });
    sessionStorage.setItem('userType', userType);
    if (userType === 'managerUser') window.location = '/loan_list';
    else window.location = '/my_loans';
  };

  signInSuccess = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('got the ID!!', user.uid);

      const userLoginDetails = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid 
      }
      // save user login details in reducer/global state
      this.props.dispatch(getUserLoginDetails(userLoginDetails));
      this.sendToken(user.uid, user.email);
    });
  };

  uiConfig = {
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: this.signInSuccess
    },
    // credentialHelper: firebase.auth.CredentialHelper.NONE,
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
  };

  render() {
    return (
      <div className="Account-title-containter">
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        <div className="Account-text-containter">
          <Link to="/password_reset">Forgot Password?</Link>
        </div>
      </div>
    );
  }
};

export default connect()(AccountLogin);
