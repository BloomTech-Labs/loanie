import React, { Component } from 'react';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/LoanCreate.css';

export default class LaonCreate extends Component {
  constructor() {
    super();
    this.state = {
      loanName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      coFirstName: '',
      coLastName: '',
      coMiddleName: '',
      coEmail: '',
    };
  }
  handleLoanNameChange = (event) => {
    this.setState({ loanName: event.target.value });
  }
  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
    console.log(this.state.firstName);
  }

  handleMiddleNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.middleName);
  }

  handleLastNameChange = (event) => {
    this.setState({ middleName: event.target.value });
    console.log(this.state.lastName);
  }
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  handleCoFirstNameChange = (event) => {
    this.setState({ coFirstName: event.target.value });
    console.log(this.state.coFirstName);
  }
  handleCoMiddleNameChange = (event) => {
    this.setState({ coMiddleName: event.target.value });
    console.log(this.state.coMiddleName);
  }

  handleCoLastNameChange = (event) => {
    this.setState({ coLastName: event.target.value });
    console.log(this.state.coLastName);
  }
  handleCoEmailChange = (event) => {
    this.setState({ coEmail: event.target.value });
    console.log(this.state.coEmail);
  }
  submitNewLoan() {
    console.log(this.state.loanName);
  }
  render() {
    return (
      <div className="LoanCreate">
        <Navbar />
        <div className="LoanCreate-title-container">
          <h1>Create new Loan</h1>
        </div>
        <div className="LoanCreate-form-container">
          <form>
            <fieldset>
              <legend>Borrower information:</legend>
              First Name: <input type="text" name="firstname" onChange={this.handleFirstNameChange} />
              Middle Name: <input type="text" name="middlename" onChange={this.handleMiddleNameChange} />
              Last Name: <input type="text" name="middlename" onChange={this.handleLastNameChange} />
              <br /><br />
              Email: <input type="text" name="email" onChange={this.handleEmailChange} />
              <br />
              <br />
              Loan Type:
              <select>
                <option value="new">New Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="Constuction">Construction</option>
              </select>
              <br /><br />
            </fieldset>
          </form>
          <br /><br />
          <form>
            <fieldset>
              <legend>Co-Borrower information (if applicable):</legend>
              First Name: <input type="text" name="firstname" onChange={this.handleCoUsernameChange} />
              Middle Name: <input type="text" name="middlename" onChange={this.handleCoUsernameChange} />
              Last Name: <input type="text" name="middlename" onChange={this.handleCoUsernameChange} />
              <br /><br />
              Email: <input type="text" name="email" onChange={this.handleCoUsernameChange} />
              <br /><br />
            </fieldset>
          </form>
          <br /><br />
          <button onClick={this.submitManagerAccountInfo}>Submit</button>
        </div>
        <SideBarNav />
      </div>
    );
  }
}
