import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClientSideNav from './ClientSideNav';
import '../CSS/MyLoans.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loanList: [],
      currentPhase: '',
      userType: sessionStorage.getItem('userType'),
      currentAssignent: 'assignment 3',
      tokenId: sessionStorage.getItem('tokenId'),
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  componentDidMount() {
    console.log(this.state.userType);
    console.log('hello');
    console.log(this.state.tokenId);
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log(res);
        const userID = res.data.UID;
        const user = res.data.name;
        axios
          .post('http://localhost:3030/getclientloans', userID)
          .then((loandata) => {
            const currentPhase = loandata.data.currentStatus;
            this.setState({ username: user, currentPhase });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  selectLoan() {
    console.log(this.state.username);
  }
  render() {
    // render getter
    const token = this.state.tokenId;
    const user = this.state.userType;
    console.log(sessionStorage.getItem('tokenId'));
    console.log('state tokenId:', token);
    console.log(this.state.username);
    console.log(this.state.userType);
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    if (user === 'managerUser') {
      return (
        <div>
          <h1> Please login to as a standard user </h1>
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
