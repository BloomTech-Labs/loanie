import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import PhaseContent from './PhaseContent';

import '../CSS/MyLoans.css';

export default class ClientSelectedLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      checked: [],
      borrower: '',
      phase: null,
      coBorrower: 'Bob',
      type: 'New Purchase',
      amount: '',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    const body = { token: this.state.tokenId };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log(res.data.name);
        const userName = res.data.name;
        axios
          .get(`http://localhost:3030/loan/${getLoanId}`)
          .then((loandata) => {
            console.log(loandata.data);
            loandata.data.assignments.map((val) => {
              this.state.assignments.push(val.text);
              this.state.checked.push(val.complete);
              console.log(loandata.data.currentStatus);
            });
            this.setState({
              borrower: userName,
              amount: loandata.data.amount,
              phase: loandata.data.currentStatus,
              type: loandata.data.loanType,
            });
            // console.log(this.state.phase);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // getter
    const token = this.state.tokenId;
    // console.log(sessionStorage.getItem('tokenId'));
    // console.log('state tokenId:', token);
    console.log(this.state.phase);
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            {' > '}
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="MyLoans-title-container">
          <h1>
            <b>Loan Progress</b>
          </h1>
        </div>
        <div className="MyLoans-container">
          <div className="MyLoans-borrower-container">
            <p>
              <b>Borrower: </b>
              {this.state.borrower}
            </p>
            <p>
              <b>Co-Borrower: </b>
              {this.state.coBorrower}
            </p>
            <p>
              <b>Type: </b>
              {this.state.type}
            </p>
            <p>
              <b>Amount: </b>
              {this.state.amount}
            </p>
          </div>
          <div className="Myloans-progress-container">
            <ProgressBar />
          </div>
        </div>
        <div className="MyLoans-content-container">
          <div className="MyLoans-assignment-container">
            <div className="MyLoans-input-container">
              <div className="MyLoans-p1-item">
                <p> Your loan officer will update these boxes as they recieve your documents</p>
              </div>
              <br />
              {this.state.assignments.map((val, index) => {
                if (this.state.checked[index] !== false) {
                  return (
                    <p>
                      {val} <input type="checkbox" disabled="disabled" checked />
                    </p>
                  );
                }
                return (
                  <p>
                    {val} <input type="checkbox" disabled="disabled" />
                  </p>
                );
              })}
            </div>
            <br />
            <p>
              {' '}
              If you have any questions call Bob Officer: <br />1-800-000-000
            </p>
          </div>
          <div className="MyLoans-text-container">
            <div className="MyLoans-text-item">
              <PhaseContent />
            </div>
          </div>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
