import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import axios from "axios";
import Navbar from "./Navbar";
import SidebarNav from "./SideBarNav";
import { assignmentDefaults } from "./AssignmentDefaults";
import "../CSS/LoanCreate.css";

export default class LoanCreate extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem("tokenId"),
      managerName: "",
      managerEmail: "",
      clientName: "",
      phoneNumber: "",
      managerPhone: "",
      loanManagerId: "",
      clientEmail: "default@email.com",
      loanType: "new",
      amount: "",
    };
  }

  componentWillMount() {
    let base = process.env.BASE_URL || "http://localhost:3030";
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post(`${base}/user`, body)
      .then(res => {
        console.log("res name", res.data.name);
        this.setState({
          managerName: res.data.name,
          managerEmail: res.data.email,
          managerPhone: res.data.mobilePhone,
          loanManagerId: res.data._id,
        });
        console.log("Response from server: ", res);
      })
      .catch(err => {
        console.log("Unable to fetch user data.", err);
      });
  }

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
    console.log(this.state.amount);
  };

  handleEmailChange = event => {
    this.setState({ clientEmail: event.target.value });
    console.log(this.state.email);
  };

  handleSmsChange = event => {
    this.setState({ phoneNumber: event.target.value });
    console.log(this.state.phoneNumber);
  };

  sendNewLoanNotification = () => {
    let base = process.env.BASE_URL || "http://localhost:3030";
    // axios request to get client name
    const request = { email: this.state.clientEmail };
    console.log("request from loan create: ", request);
    axios
      .post(`${base}/userbyemail`, request)
      .then(res => {
        console.log("res.data.name: ", res.data.name);
        this.setState({ clientName: res.data.name });

        const link = "https://loanie.herokuapp.com/";
        const message = `Hi ${this.state.clientName}! Your loan officer, ${
          this.state.managerName
        }, would like to cordially invite you to use a new cutting edge mortgage communication tool called Loanie! Your loan information is waiting for you, all you have to do is sign up at ${link} . If you have any trouble or questions you can contact ${
          this.state.managerName
        } by phone at ${this.state.managerPhone} or by email at ${
          this.state.managerEmail
        } .`;

        // axios request to send text notification.
        const textRequest = {
          phoneNumber: this.state.phoneNumber,
          text: message,
        };
        axios
          .post(`${base}/sendsms`, textRequest)
          .then(res => {
            console.log("Success! Response from server: ", res);
          })
          .catch(err => {
            console.log("Loan creation failed.", err);
          });

        // axios request to send email notification.
        const emailRequest = {
          email: this.state.clientEmail,
          text: message,
        };
        axios
          .post(`${base}/sendemail`, emailRequest)
          .then(response => {
            console.log("Success! Response from server: ", response);
            window.location = "/open_loans";
          })
          .catch(err => {
            console.log("Loan creation failed.", err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  sendNewLoanDB() {
    let base = process.env.BASE_URL || "http://localhost:3030";
    const defaults = assignmentDefaults(this.state.loanType);
    console.log("assignments", defaults);
    console.log("state", this.state);
    console.log(assignmentDefaults());
    const body = {
      loanManagerId: this.state.loanManagerId,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
      assignments: defaults,
    };
    axios
      .post(`${base}/newloan`, body)
      .then(res => {
        console.log("Success! Response from server: ", res);
        this.sendNewLoanNotification();
      })
      .catch(err => {
        console.log("Loan creation failed.", err);
      });
  }

  submitNewLoan = () => {
    this.sendNewLoanDB();
  };

  handleDropDown = e => {
    console.log(e.target.value);
    this.setState({ loanType: e.target.value });
  };

  render() {
    // render getter
    const token = this.state.tokenId;
    console.log(sessionStorage.getItem("tokenId"));
    console.log("state tokenId:", token);
    if (token === null || token === undefined || token === "") {
      window.location = "/login_user";
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
              Loan Amount:{" "}
              <input
                type="text"
                name="amount"
                placeholder="$0.00"
                onChange={this.handleAmountChange}
              />
              <br />
              <br />
              Borrower Email:{" "}
              <input
                type="text"
                placeholder="abc@example.com"
                name="email"
                onChange={this.handleEmailChange}
              />
              <br />
              <br />
              Borrower Contact No.:{" "}
              <input
                type="text"
                placeholder="+12223334444"
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
