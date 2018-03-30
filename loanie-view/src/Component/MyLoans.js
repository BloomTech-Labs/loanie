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
  }
  selectLoan = () => {
    console.log(this.state.username);
  };
  render() {
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
