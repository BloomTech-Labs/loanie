import React, { Component } from 'react';
import Navbar from './Navbar';
import SidebarNav from './SidebarNav';
import '../CSS/Billing.css';

export default class Billing extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      creditCardNumber: '',
      creditCardExperation: '',
      loanPlan: '',
    };
    this.handleCreditCardNumber = this.handleCreditCardNumber.bind(this);
    this.submitBillingInfo = this.submitBillingInfo.bind(this);
    this.handleOneYPlanSelection = this.handleOneYPlanSelection.bind(this);
    this.handleOneLPlanSelection = this.handleOneLPlanSelection.bind(this);
  }
  submitBillingInfo() {
    console.log(this.state.username);
    console.log(this.state.creditCardExperation);
  }
  handleCreditCardNumber(event) {
    this.setState({ creditCardNumber: event.target.value });
    console.log(this.state.creditCardNumber);
  }
  handleOneYPlanSelection() {
    this.setState({ loanPlan: '1 Year Subscription' });
    console.log(this.state.loanPlan);
  }
  handleOneLPlanSelection() {
    this.setState({ loanPlan: '1 Loan' });
    console.log(this.state.loanPlan);
  }
  render() {
    return (
      <div className="Billing">
        <Navbar />
        <div className="Billing-title-containter">
          <h1> Billing</h1>
          <div className="Billing-form-container">
            <form>
              <fieldset>
                <legend>Billing information:</legend>
                Credit Card:<br />
                <input type="text" name="creditname" onChange={this.handleUsernameChange} /><br /><br />
                Credit Card Number:<br />
                <input type="text" name="creditnumber" onChange={this.handleCreditCardNumber} /><br /><br />
                Expiration Date:<br />
                <input type="date" name="expDate" onChange={this.handlePasswordChange} /><br /><br />
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend>Select Plan:</legend>
                <input type="checkbox" name="creditname" onChange={this.handleOneYPlanSelection} />: 1 Year Subscription - $99.99<br />
                <input type="checkbox" name="creditname" onChange={this.handleOneLPlanSelection} />: 1 Loan - $9.99<br /><br />
              </fieldset>
            </form>
            <button onClick={this.submitBillingInfo}>Submit</button>
          </div>
        </div>
        <SidebarNav />
      </div>
    );
  }
}
