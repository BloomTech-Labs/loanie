import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './Firebase';
// import { connect } from 'react-redux';
import SideBarNav from './SideBarNav';
// import { getUserLoginDetails } from '../Actions';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../CSS/Navbar.css';

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
    // Clear userLoginDetails stored in Redux state.
    // this.props.dispatch(getUserLoginDetails({}));
  };

  render() {
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      return (
        <div className="navbarA navbar-inverseA navbar-fixed-topA">
          <div className="container-fluidA">
            <div className="navbar-headerA">
              <Link to="/">
                <h1 className="App-title-item">Loanie</h1>
              </Link>
            </div>
            <ul className="App-signin-container">
              <Link className="App-signup-item" to="/login_user">
                Sign In
              </Link>
              <Link className="App-signup-item" to="/new_account">
                Sign Up
              </Link>
            </ul>
          </div>
          <SideBarNav />
        </div>
      );
    }
    return (
      <div className="navbarA navbar-inverseA navbar-fixed-topA">
        <div className="container-fluidA">
          <div className="navbar-headerA">
            <Link to="/">
              <h1 className="App-title-item">Loanie</h1>
            </Link>
          </div>
          <ul className="App-signin-container">
            <Link className="App-signup-item" onClick={this.logout} to="/login_user">
              Sign Out
            </Link>
          </ul>
        </div>
        <SideBarNav />
      </div>
    );
  }
}

// connect()(Navbar);
