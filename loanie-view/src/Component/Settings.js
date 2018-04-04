import React, { Component } from 'react';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/Settings.css';

// test SSH

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      email: 'johnexample@email.com',
      phoneNumber: '123-456-7890',
      displayName: 'John',
      password: '**************',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  render() {
    // render getter
    const token = this.state.tokenId;
    console.log(sessionStorage.getItem('tokenId'));
    console.log('state tokenId:', token);
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    return (
      <div className="Settings">
        <Navbar />
        <div className="Settings-title-containter">
          <h1>Settings</h1>
        </div>
        <div className="Settings-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              <h4>Email:</h4>
              {this.state.email}
              <br />
              <button>Edit</button>
              <br />
              <br />
              <h4>Phone Number:</h4>
              {this.state.phoneNumber} <br />
              <button>Edit</button>
              <br />
              <br />
              <h4>Display Name:</h4>
              {this.state.displayName}
              <br />
              <button>Edit</button>
              <br />
              <br />
              <h4>Password:</h4>
              {this.state.password}
              <br />
              <button>Edit</button>
              <br />
              <br />
            </fieldset>
          </form>
          <SidebarNav />
        </div>
      </div>
    );
  }
}
