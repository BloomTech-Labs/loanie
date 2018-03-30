import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase

const config = {
  apiKey: 'AIzaSyBUytt2TnjQ7Zso0GqnhQPctglDlcVqfdw',
  authDomain: 'loanie-web.firebaseapp.com',
  databaseURL: 'https://loanie-web.firebaseio.com',
  projectId: 'loanie-web',
  storageBucket: 'loanie-web.appspot.com',
  messagingSenderId: '817227528608',
};

// Check to see if FirebaseUI Widget is Initialized
// Initialize FirebaseUI Widget using Firebase
if (!firebase.apps.length ? firebase.initializeApp(config) : firebase.app());

const auth = firebase.auth();

export { firebase, auth };
