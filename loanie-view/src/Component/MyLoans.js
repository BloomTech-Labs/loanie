import React, { Component } from 'react';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  selectLoan = () => {
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
          <h1>My Loans</h1>
          <h1>You currently do not have any active loans.</h1>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
