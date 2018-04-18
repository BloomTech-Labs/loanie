import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import moment from 'moment';
import base from './base';
import Navbar from './Navbar';
import firebase from './Firebase';
// import { connect } from 'react-redux';
// import { changeTokenId } from '../Actions';
import '../CSS/AccountLogin.css';

const expirationCheck = (exp, tokenId) => {
  if (exp <= moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')) {
    console.log('expired!');
    const userInfo = {
      token: tokenId,
      userType: 'standardUser',
    };

    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        sessionStorage.setItem('userType', 'standardUser');
        console.log('Success response: ', res);
      })
      .catch((err) => {
        console.log('Failed to make changes to user!', err);
      });
  }
  console.log('subscription not expired');
};

const sendToken = (tokenId, sendEmail) => {
  // setter
  console.log('set sessionStorage id ann email', tokenId, sendEmail);
  sessionStorage.setItem('tokenId', tokenId);
  sessionStorage.setItem('email', sendEmail);
  // console.log('Inside sendToken(), this.props: ', this.props);
  // Change token in Redux state.
  // this.props.dispatch(changeTokenId(tokenId));

  const data = {
    token: tokenId,
    email: sendEmail,
  };
  axios
    .post(`${base}/auth`, data)
    .then((res) => {
      if (res.data.userType === 'managerUser') expirationCheck(res.data.subExp, tokenId);
      const usertype = res.data.userType;
      sessionStorage.setItem('userType', usertype);
      if (usertype === 'managerUser') window.location = '/open_loans';
      else window.location = '/my_loans';
    })
    .catch((err) => {
      throw err;
    });
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
    signInSuccess: () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('got the ID!!', user.uid);
        console.log('user email', user.email);
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
    <div>
      <Navbar />
      <div className="Account-title-containter">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   tokenId: state.tokenId,
// });

// export default connect(mapStateToProps)(AccountLogin);
