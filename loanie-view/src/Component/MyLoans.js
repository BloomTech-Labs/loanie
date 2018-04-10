import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from './Navbar';
import OpenLoans from './OpenLoans';
import ClosedLoans from './ClosedLoans';
import ClientSideNav from './ClientSideNav';
import '../CSS/MyLoans.css';
import '../CSS/LoanList.css';

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
    // console.log(this.state.userType);
    // console.log('hello');
    // console.log(this.state.tokenId);
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        const userEmail = res.data.email;
        const user = res.data.name;
        axios
          .post('http://localhost:3030/getclientloans', userEmail)
          .then((loandata) => {
            console.log(loandata.data);
            this.setState({ loanList: loandata.data });
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
    // console.log(sessionStorage.getItem('tokenId'));
    // console.log('state tokenId:', token);
    // console.log(this.state.username);
    // console.log(this.state.userType);
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
          <div className="MyLoans-link-container">
            {this.state.loanList.map((val, index) => {
              return (
                <div className="MyLoans-loancard">
                  <Link to={`my_loan/${val._id}`}>
                    <h1>Loan {index + 1}</h1>
                  </Link>
                <p>Current Phase: Phase {val.currentStatus}</p>
                <Link to={`my_loan/${val._id}`}>
                  <h3>See Details</h3>
                </Link>
                </div>
              );
            })}
          </div>
          <ClientSideNav />
        </div>
      );
    }
  }
}
