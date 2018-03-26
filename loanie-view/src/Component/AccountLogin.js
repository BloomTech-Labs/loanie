import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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
const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/loan_list',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

export default function AccountLogin() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
