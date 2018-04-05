import React, { Component } from 'react';
import Navbar from './Navbar';
import OpenLoans from './OpenLoans';
import ClosedLoans from './ClosedLoans';
import ClientSideNav from './ClientSideNav';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      tokenId: sessionStorage.getItem('tokenId'),
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  selectLoan() {
    console.log(this.state.username);
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
      <div className="Loanlist">
        <Navbar />
        <div className="Loanlist-title-containter">
          <h1>Open Loans</h1>
          <OpenLoans />
          <br/>
          <h1>Closed Loans</h1>
          <ClosedLoans />
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
