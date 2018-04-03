import React, { Component } from 'react';
import Navbar from './Navbar';
import SidebarNav from './SidebarNav';
import '../CSS/LoanList.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      tokenId: sessionStorage.getItem('tokenId'),
    };
    this.submitNewLoan = this.submitNewLoan.bind(this);
  }
  submitNewLoan() {
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
          <h2> There are no closed Loans </h2>
        </div>
        <SidebarNav />
      </div>
    );
  }
}
