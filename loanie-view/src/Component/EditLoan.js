import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/LoanList.css';

class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      clientEmail: '',
      amount: '',
      loanType: '',
      managerEmail: '',
      currentStatus: '',
      openLoan: '',
      assignments: '',
    };
  }

  componentWillMount() {
    const id = this.props.loanId;
    axios
      .get(`http://localhost:3030/loan/${id}`)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({
          clientEmail: res.data.clientEmail,
          amount: res.data.amount,
          loanType: res.data.loanType,
          managerEmail: res.data.email,
          currentStatus: res.data.currentStatus,
          openLoan: res.data.openLoan,
          assignments: res.data.assignments,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  selectLoan = () => {
    console.log(this.state.username);
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
      <div className="Loanlist">
        <SidebarNav />
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
            <BreadcrumbItem active>Edit Loan</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Loanlist-title-containter">
          <h1>Edit Loan</h1>
        </div>
        <div className="LoanCreate-form-container">
          <form>
            <fieldset>
              <legend>Confirm Client Email Before Editing: ${this.state.clientEmail}</legend>
              Edit Loan Type:
              <select value={this.state.loanType} onChange={this.handleDropDownType}>
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
                <option value="true">True</option>
                <option value="flase">Flase</option>
              </select>
              <br />
              <br />
              Edit Loan Amount: <input type="text" name="amount" value={this.state.amount || ''} onChange={this.handleAmountChange} />
              <br />
              <br />
              Assignments
              <br />
            </fieldset>
          </form>
          <button onClick={this.submitNewLoan}>Submit</button>
        </div>
      </div>
    );
  }
}

export default LoanList;
