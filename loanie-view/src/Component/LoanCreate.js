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
      clientName: '',
      phoneNumber: '',
      managerPhone: '',
      loanManagerId: '',
      clientEmail: 'default@email.com',
      loanType: 'new',
      amount: '',
      acceptTexts: true,
      acceptEmails: true,
    };
  }

  componentWillMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        this.setState({
          managerName: res.data.name,
          managerEmail: res.data.email,
          managerPhone: res.data.mobilePhone,
          loanManagerId: res.data._id,
          acceptTexts: res.data.acceptTexts,
          acceptEmails: res.data.acceptEmails,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ clientEmail: event.target.value });
  };

  handleSmsChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  sendNewLoanNotification = () => {
    // axios request to get client name
    const request = { email: this.state.clientEmail };
    axios
      .post('http://localhost:3030/userbyemail', request)
      .then((res) => {
        this.setState({ clientName: res.data.name });

        const link = 'https://loanie.herokuapp.com/';
        const message = `Hi ${this.state.clientName}! Your loan officer, ${
          this.state.managerName
        }, would like to cordially invite you to use a new cutting edge mortgage communication tool called Loanie! Your loan information is waiting for you, all you have to do is sign up at ${link} . If you have any trouble or questions you can contact ${
          this.state.managerName
        } by phone at ${this.state.managerPhone} or by email at ${this.state.managerEmail} .`;

        // axios request to send text notification.
<<<<<<< HEAD
        if(this.state.acceptTexts) {
          const textRequest = {
            phoneNumber: this.state.phoneNumber,
            text: message,
          };
          axios
            .post('http://localhost:3030/sendsms', textRequest)
            .then((res) => {
              console.log('Success! Response from server: ', res);
            })
            .catch((err) => {
              console.log('Loan creation failed.', err);
            });
        }
        
=======
        const textRequest = {
          phoneNumber: this.state.phoneNumber,
          text: message,
        };
        axios
          .post('http://localhost:3030/sendsms', textRequest)
          .then(() => {
            console.log('Success!');
          })
          .catch((err) => {
            throw err;
          });

>>>>>>> 5422fc7ab9a1d3d1244df79c9c70d60ffa984e4e
        // axios request to send email notification.
        if(this.state.acceptEmails) {
          const emailRequest = {
          email: this.state.clientEmail,
          text: message,
        };
        axios
          .post('http://localhost:3030/sendemail', emailRequest)
          .then(() => {
            window.location = '/open_loans';
          })
          .catch((err) => {
            throw err;
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  sendNewLoanDB() {
    const defaults = assignmentDefaults(this.state.loanType);
    const body = {
      loanManagerId: this.state.loanManagerId,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
      assignments: defaults,
    };
    axios
      .post('http://localhost:3030/newloan', body)
      .then(() => {
        this.sendNewLoanNotification();
      })
      .catch((err) => {
        throw err;
      });
  }

  submitNewLoan = () => {
    this.sendNewLoanDB();
  };

  handleDropDown = (e) => {
    this.setState({ loanType: e.target.value });
  };

  render() {
    // render getter
    const token = this.state.tokenId;
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
            <BreadcrumbItem tag="a" href="/open_loans">
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
              Loan Amount:{' '}
              <input
                type="text"
                name="amount"
                placeholder="$0.00"
                onChange={this.handleAmountChange}
              />
              <br />
              <br />
              Borrower Email:{' '}
              <input
                type="text"
                placeholder="abc@example.com"
                name="email"
                onChange={this.handleEmailChange}
              />
              <br />
              <br />
              Borrower Contact No.:{' '}
              <input
                type="text"
                placeholder="2223334444"
                name="contactNo"
                onChange={this.handleSmsChange}
              />
              <br />
            </fieldset>
          </form>
          <button onClick={this.submitNewLoan}>Submit</button>
        </div>
      </div>
    );
  }
}
