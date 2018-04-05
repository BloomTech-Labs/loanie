import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
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
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            {' > '}
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Navbar />
        <div className="Loanlist-title-containter">
          <h1>My Loans</h1>
          <h2>You currently do not have any active loans.</h2>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
