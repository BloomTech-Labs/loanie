import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import { connect } from 'react-redux';
import getTokenId from '../Actions';
import '../CSS/AccountLogin.css';

const firebase = require('firebase');
// const firebaseui = require('firebaseui');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBUytt2TnjQ7Zso0GqnhQPctglDlcVqfdw',
  authDomain: 'loanie-web.firebaseapp.com',
  databaseURL: 'https://loanie-web.firebaseio.com',
  projectId: 'loanie-web',
  storageBucket: 'loanie-web.appspot.com',
  messagingSenderId: '817227528608',
};
firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
function sendToken(idToken) {
  console.log('this.props', this.props);
  this.props.dispatch(getTokenId(idToken));
  console.log('sending token!');
  const token = { token: idToken };
  axios
    .post('http://localhost:3030/auth', token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/loan_list',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // credentialHelper: firebase.auth.CredentialHelper.NONE,
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

class AccountLogin extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  render() {
    console.log('this.props', this.props);

    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
          signInSuccess={firebase.auth().onAuthStateChanged((user) => {
            console.log('got the ID!!', user.uid);
            sendToken(user.uid);
          })}
        />
      </div>
    );
  }
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreators, dispatch);
// }
export default connect()(AccountLogin);
