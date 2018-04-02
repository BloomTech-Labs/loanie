import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from './Firebase';
import '../App.css';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out successfully!');
      })
      .catch((error) => {
        console.log('error signing out', error);
      });
    sessionStorage.removeItem('tokenId');
  };

  render() {
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/">
                <h1 className="App-title-item">Loanie</h1>
              </Link>
            </div>
            <ul className="App-signin-container">
              <li>
                <Link className="App-signin-item" to="/login_user">
                  Sign In
                </Link>
                <Link className="App-signup-item" to="/new_account">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/">
              <h1 className="App-title-item">Loanie</h1>
            </Link>
          </div>
          <ul className="App-signin-container">
            <li>
              <Link className="App-signin-item" onClick={this.logout} to="/login_user">
                Sign Out
              </Link>
              <Link className="App-signup-item" to="/new_account">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
