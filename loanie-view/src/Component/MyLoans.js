import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/MyLoans.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      loanList: 'myLoan',
      currentPhase: 'Phase 3',
      currentAssignent: 'assignment 3',
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
    if (this.state.loanList !== '') {
      return (
        <div className="MyLoans">
          <Navbar />
          <div className="MyLoans-link-container">
            <Link to="my_loan">
              <h1>Loan 1</h1>
            </Link>
            <p>Current Phase: {this.state.currentPhase}</p>
            <p>Current Assignment: {this.state.currentAssignent}</p>
            <Link to="my_loan">
              <h3>See Details</h3>
            </Link>
          </div>
          <ClientSideNav />
        </div>
      );
    }
    return (
      <div className="Loanlist">
        <Navbar />
        <div className="Loanlist-title-containter">
          <h1>My Loans</h1>
          <h2 >You currently do not have any active loans.</h2>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
