import React, { Component } from 'react';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  selectLoan() {
    console.log(this.state.username);
  }
  render() {
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
