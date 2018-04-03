import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from './Firebase';
import SideBarNav from './SideBarNav';
import '../App.css';

export default class Navbar extends Component {
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
        <div>
          <SideBarNav />
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/">
                  <h1 className="App-title-item">Loanie</h1>
                </Link>
              </div>
              <ul className="App-signin-container">
                <Link className="App-signin-item" to="/login_user">
                  Sign In
                </Link>
                <Link className="App-signup-item" to="/new_account">
                  Sign Up
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <SideBarNav />
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/">
              <h1 className="App-title-item">Loanie</h1>
            </Link>
          </div>
          <ul className="App-signin-container">
            <Link className="App-signin-item" onClick={this.logout} to="/login_user">
              Sign Out
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}
