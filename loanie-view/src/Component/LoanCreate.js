import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/LoanCreate.css';

export default class LoanCreate extends Component {
  constructor() {
    super();
    this.state = {
      loanName: '',
      amount: '',
      managerName: '',
      managerEmail: '',
      coFirstName: '',
      coLastName: '',
      coMiddleName: '',
      coEmail: '',
      tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: '',
    };
  }

  componentDidMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        this.setState({
          managerName: res.data.name,
          managerEmail: res.data.email,
          phoneNumber: res.data.mobilePhone,
          loanManagerId: res.data._id,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  handleLoanNameChange = (event) => {
    this.setState({ loanName: event.target.value });
  };
  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
    console.log(this.state.amount);
  };

  handleMiddleNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.middleName);
  };

  handleLastNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.lastName);
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  };
  handleCoFirstNameChange = (event) => {
    this.setState({ coFirstName: event.target.value });
    console.log(this.state.coFirstName);
  };
  handleCoMiddleNameChange = (event) => {
    this.setState({ coMiddleName: event.target.value });
    console.log(this.state.coMiddleName);
  };

  handleCoLastNameChange = (event) => {
    this.setState({ coLastName: event.target.value });
    console.log(this.state.coLastName);
  };
  handleCoEmailChange = (event) => {
    this.setState({ coEmail: event.target.value });
    console.log(this.state.coEmail);
  };
  submitNewLoan() {
    console.log(this.state.loanName);
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
      <div className="LoanCreate">
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            {' > '}
            <BreadcrumbItem tag="a" href="/loan_list">
              Loans
            </BreadcrumbItem>
            {' > '}
            <BreadcrumbItem active>Loan Creation</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="LoanCreate-title-container">
          <h1>Create new Loan</h1>
        </div>
        <div className="LoanCreate-form-container">
          <form>
            <fieldset>
              <legend>Borrower information:</legend>
              Loan Type:
              <select>
                <option value="fha">FHA</option>
                <option value="usda">USDA</option>
                <option value="va">VA</option>
                <option value="conventional">Conventional</option>
                <option value="new">New Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="Constuction">Construction</option>
              </select>
              <br />
              <br />
              Loan Amount: <input type="text" name="amount" onChange={this.handleAmountChange} />
              <br />
              <br />
              Borrower Email: <input type="text" name="email" onChange={this.handleEmailChange} />
              <br />
            </fieldset>
          </form>
          <button onClick={this.submitManagerAccountInfo}>Submit</button>
        </div>
        <SidebarNav />
      </div>
    );
  }
}
