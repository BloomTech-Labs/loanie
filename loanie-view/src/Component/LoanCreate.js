import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import { assignmentDefaults } from './AssignmentDefaults';
import '../CSS/LoanCreate.css';

export default class LoanCreate extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      managerName: '',
      managerEmail: '',
      phoneNumber: '',
      loanManagerId: '',
      clientEmail: '',
      loanType: 'new',
      amount: '',
    };
  }

  componentWillMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
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

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
    console.log(this.state.amount);
  };

  handleEmailChange = (event) => {
    this.setState({ clientEmail: event.target.value });
    console.log(this.state.email);
  };

  sendNewLoanEmail() {
    console.log('hello');
    const body = {
      managerName: this.state.managerName,
      managerEmail: this.state.managerEmail,
      phoneNumber: this.state.phoneNumber,
      clientEmail: this.state.clientEmail,
    };
    axios
      .post('http://localhost:3030/newloanemail', body)
      .then((res) => {
        console.log('Success! Response from server: ', res);
        window.location = '/open_loans';
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });
  }

  sendNewLoanDB() {
    const defaults = assignmentDefaults(this.state.loanType);
    console.log('assignments', defaults);
    console.log('state', this.state);
    console.log(assignmentDefaults());
    const body = {
      loanManagerId: this.state.loanManagerId,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
      assignments: defaults,
    };
    axios
      .post('http://localhost:3030/newloan', body)
      .then((res) => {
        console.log('Success! Response from server: ', res);
        this.sendNewLoanEmail();
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });
  }

  submitNewLoan = () => {
    this.sendNewLoanDB();
  };

  handleDropDown = (e) => {
    console.log(e.target.value);
    this.setState({ loanType: e.target.value });
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
      <div className="LoanCreate">
        <Navbar />
        <SidebarNav />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/loan_list">
              Loans
            </BreadcrumbItem>
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
              <select onChange={this.handleDropDown}>
                <option value="new">New Loan</option>
                <option value="refinance">Refinance</option>
                <option value="construction">Construction</option>
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
          <button onClick={this.submitNewLoan}>Submit</button>
        </div>
      </div>
    );
  }
}
