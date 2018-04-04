import React from 'react';
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import firebase from './Firebase';
// import { connect } from 'react-redux';
// import { changeTokenId } from '../Actions';
import '../CSS/AccountLogin.css';

const sendToken = (tokenId, sendEmail) => {
  // setter
  sessionStorage.setItem('tokenId', tokenId);
  sessionStorage.setItem('email', sendEmail);

  console.log('Inside sendToken(), this.props: ', this.props);

  // Change token in Redux state.
  // this.props.dispatch(changeTokenId(tokenId));

  console.log('sending token to server!');
  const data = {
    token: tokenId,
    email: sendEmail,
  };
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

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: (credential) => {
      firebase.auth().onAuthStateChanged((user) => {
        sessionStorage.setItem('credential', credential);
        console.log('got the ID!!', user.uid);
        console.log('firebase user', user);

        sendToken(user.uid, user.email);
      });
    },
  },
  // credentialHelper: firebase.auth.CredentialHelper.NONE,
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

export default function AccountLogin() {
  // console.log('TOKEN ID:', this.props.tokenId);

  return (
    <div className="Account-title-containter">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <div className="Account-text-containter">
        <Link to="/password_reset">Forgot Password?</Link>
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   tokenId: state.tokenId,
// });

// export default connect(mapStateToProps)(AccountLogin);
