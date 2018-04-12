import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditLoan extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      clientEmail: '',
      amount: '',
      loanType: '',
      managerEmail: '',
      currentStatus: '',
      openLoan: '',
      assignments: '',
      loanId: '',
    };
  }

  componentWillMount() {
    const getLoanId = window.location.href;
    const id = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${id}`)
      .then((res) => {
        console.log('res clientemail', res.data.clientEmail);
        this.setState({
          clientEmail: res.data.clientEmail,
          amount: res.data.amount,
          loanType: res.data.loanType,
          managerEmail: res.data.email,
          currentStatus: res.data.currentStatus,
          openLoan: res.data.openLoan,
          loanId: id,
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

  handleDropDownType = (e) => {
    console.log(e.target.value);
    this.setState({ loanType: e.target.value });
  };

  handleDropDownOpen = (e) => {
    console.log(e.target.value);
    this.setState({ openLoan: e.target.value });
  };

  handleDropDownPhase = (e) => {
    console.log(e.target.value);
    this.setState({ currentStatus: e.target.value });
  };

  submitEditedLoan = () => {
    console.log('state', this.state);
    const id = this.state.loanId;
    const body = {
      currentStatus: this.state.currentStatus,
      openLoan: this.state.openLoan,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
    };
    axios
      .post(`http://localhost:3030/loan/${id}`, body)
      .then(() => {
        console.log('Loan edited successfully!');
        window.location = '/open_loans';
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });
  };

  render() {
    // getter
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
      <div className="EditLoan">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/loan_list">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit Loan</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Loan</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              <legend>Confirm Client Email Before Editing: {this.state.clientEmail} </legend>
              Edit Loan Type:
              <select value={this.state.loanType} onChange={this.handleDropDownType}>
                <option value="new">New Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="constuction">Construction</option>
              </select>
              <br />
              <br />
              Edit Phase:
              <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <br />
              Edit Loan Open Status:
              <select value={this.state.openLoan} onChange={this.handleDropDownOpen}>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
              <br />
              <br />
              Edit Loan Amount:{' '}
              <input
                type="text"
                name="amount"
                value={this.state.amount || ''}
                onChange={this.handleAmountChange}
              />
              <br />
              <br />
            </fieldset>
          </form>
          <button onClick={this.submitEditedLoan}>Submit</button>
        </div>
      </div>
    );
  }
}

export default EditLoan;
