import React, { Component } from 'react';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/LoanList.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  submitNewLoan = () => {
    console.log(this.state.username);
  };
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
      <div className="Loanlist">
        <Navbar />
        <div className="Loanlist-title-containter">
          <h1>Closed Loans</h1>
          <h1> There are no closed Loans </h1>
        </div>
        <SideBarNav />
      </div>
    );
  }
}
