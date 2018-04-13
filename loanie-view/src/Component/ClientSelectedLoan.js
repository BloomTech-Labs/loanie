import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody } from 'reactstrap';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import PhaseContent from './PhaseContent';
import '../CSS/ClientSelectedLoan.css';

export default class ClientSelectedLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      checked: [],
      borrower: '',
      coBorrower: 'Bob',
      type: '',
      amount: '',
      userType: sessionStorage.getItem('userType'),
      phaseContent: '',
      phaseNumber: null,
      phaseTitle: '',
      currentLoanId: '',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${getLoanId}`)
      .then((loandata) => {
        console.log(loandata.data);
        const assignArr = loandata.data.assignments;
        this.setState({
          amount: loandata.data.amount,
          type: loandata.data.loanType,
          phaseNumber: loandata.data.currentStatus,
          currentLoanId: getLoanId,
        });
        // axios request to get a user by email
        for (let i = 0; i < PhaseContent.length; i += 1) {
          if (
            PhaseContent[i].loanType === this.state.type &&
            PhaseContent[i].phase === this.state.phaseNumber
          ) {
            this.setState({
              phaseContent: PhaseContent[i].description,
              phaseTitle: PhaseContent[i].phaseTitle,
            });
          }
        }
        if (this.state.type === 'new') {
          this.setState({ type: 'new purchase' });
        }
        for (let j = 0; j < assignArr.length; j += 1) {
          if (this.state.phaseNumber === assignArr[j].phase) {
            this.state.assignments.push(assignArr[j]);
            this.state.checked.push(assignArr[j].complete);
          }
        }
        const request = { email: loandata.data.clientEmail };
        console.log('request: ', request);
        axios
          .post('http://localhost:3030/userbyemail', request)
          .then((res) => {
            console.log(res.data.name);
            const userName = res.data.name;
            this.setState({ borrower: userName });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  completedAssignment = (assignmentId, complete) => {
    const body = {
      loanId: this.state.currentLoanId,
      assignmentId,
      complete,
    };
    axios
      .post('http://localhost:3030/assignmentcomplete', body)
      .then(console.log('loan marked complete'))
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // getter
    const token = this.state.tokenId;
    const user = this.state.userType;
    let loanRoute = '';
    if (user === 'managerUser') loanRoute = '/open_loans';
    else loanRoute = '/my_loans';
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
            <BreadcrumbItem tag="a" href={loanRoute}>
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Loan Details</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="ClientLoan-title-container">
          <h1>
            <b>{this.state.phaseTitle}</b>
          </h1>
        </div>
        <div className="ClientLoan-container">
          <div className="ClientLoan-borrower-container">
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
              <b>Amount:</b> ${this.state.amount}
            </p>
          </div>
          <div className="ClientLoan-progress-container">
            <ProgressBar />
          </div>
        </div>
        <div className="ClientLoan-phase-container">
          <Card>
            <CardHeader>
              {' '}
              <h5>
                <b>Phase {this.state.phaseNumber}</b>
              </h5>
            </CardHeader>
            <CardBody>
              <p className="ClientLoan-phase-item">
                {' '}
                <b>{this.state.phaseContent}</b>
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="ClientLoan-input-container">
          <Card>
            <CardHeader>
              <h5>
                <b>Complete these assignments to move to next phase</b>
              </h5>
            </CardHeader>
            <div className="ClientLoan-assignment-container">
              <p>
                <b>
                  Your loan officer will update these boxes as they recieve your documents. If you
                  have any questions call Bob Officer: 1-800-000-000.
                </b>
              </p>
            </div>
            <div className="ClientLoan-list-container">
              {this.state.userType === 'managerUser'
                ? this.state.assignments.map((val) => {
                    const assignmentId = val._id;
                    console.log('val: ', val);
                    return (
                      <p>
                        <input
                          type="checkbox"
                          defaultChecked={val.complete}
                          onChange={() => {
                            this.completedAssignment(assignmentId, !val.complete);
                          }}
                        />{' '}
                        {val.text}
                      </p>
                    );
                  })
                : this.state.assignments.map(val => (
                  <p>
                    <input type="checkbox" defaultChecked={val.complete} disabled="disabled" />{' '}
                    {val.text}
                  </p>
                  ))}
            </div>
          </Card>
        </div>
        <br />
        <p />
        <ClientSideNav />
      </div>
    );
  }
}
