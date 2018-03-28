import React, { Component } from 'react';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/LoanList.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
    };
  }
  submitNewLoan = () => {
    console.log(this.state.username);
  }
  render() {
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
