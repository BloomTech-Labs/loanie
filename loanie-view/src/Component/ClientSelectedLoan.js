import React, { Component } from 'react';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import PhaseContent from './PhaseContent';
import '../CSS/MyLoans.css';

export default class ClientSelectedLoan extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      assignments: ['assignment 1', 'assignment 2', 'assignment 3', 'assignment 4', 'assignment 5'],
      checked: ['true', 'true', 'true', 'false', 'false'],
      borrower: 'Joe',
      coBorrower: 'Bob',
      type: 'New Purchase',
      tokenId: sessionStorage.getItem('tokenId'),
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  selectLoan() {
    console.log(this.state.username);
  }
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
      <div>
        <Navbar />
        <div className="MyLoans-title-container">
          <h1><b>Loan Progress</b></h1>
        </div>
        <div className="MyLoans-container">
          <div className="MyLoans-borrower-container">
            <p><b>Borrower: </b>{this.state.borrower}</p>
            <p><b>Co-Borrower: </b>{this.state.coBorrower}</p>
            <p><b>Type: </b>{this.state.type}</p>
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
                if (this.state.checked[index] !== 'false') {
                  return (
                    <p>{val} <input type="checkbox" disabled="disabled" checked /></p>
                  );
                }
                return (
                  <p>{val} <input type="checkbox" disabled="disabled" /></p>
                );
              })}
            </div>
            <br /><p> If you have any questions call Bob Officer: <br />1-800-000-000</p>
          </div>
          <div className="MyLoans-text-container">
            <textbox className="MyLoans-text-item">
              <PhaseContent />
            </textbox>
          </div>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
