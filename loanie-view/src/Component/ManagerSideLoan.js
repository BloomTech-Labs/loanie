import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import PhaseContent from './PhaseContent';
import '../CSS/LoanList.css';

export default class ManagerSideLoan extends Component {
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
        console.log('hello');   
        const userID = res.data.UID;
        const user = res.data.name;
        axios
          .post('http://localhost:3030/getclientloans', userID)
          .then((loandata) => {
            const currentPhase = loandata.data.currentStatus;
            this.setState({ borrower: user, currentPhase });
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
        <div className="Loanlist">
          <div className="LoanList-borrower-container">
            <p><b>Borrower: </b>{this.state.borrower}</p>
            <p><b>Co-Borrower: </b>{this.state.coBorrower}</p>
            <p><b>Type: </b>{this.state.type}</p>
          </div>
          <div className="LoanList-progress-container">
            <ProgressBar />
          </div>
        </div>
        <div className="LoanList-phasecard-container">
          <div className="LoanList-phasecard-item">
            <PhaseContent />
          </div>
          <div className="LoanList-phasecard-item">
            <PhaseContent />
          </div>
          <div className="LoanList-phasecard-item">
            <PhaseContent />
          </div>
          <div className="LoanList-phasecard-item">
            <PhaseContent />
          </div>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
