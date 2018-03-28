import React, { Component } from "react";
import Navbar from "./Navbar";
import SideBarNav from "./SideBarNav";
import { CardElement } from "react-stripe-elements";

import "../CSS/Billing.css";

export default class Billing extends Component {
  constructor() {
    super();
    this.state = {
      username: "billy",
      creditCardNumber: "",
      creditCardExperation: "",
      loanPlan: "",
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
    this.setState({ loanPlan: "1 Year Subscription" });
    console.log(this.state.loanPlan);
  }
  handleOneLPlanSelection() {
    this.setState({ loanPlan: "1 Loan" });
    console.log(this.state.loanPlan);
  }
  render() {
    return (
      <div className="Billing">
        <Navbar />
        <div className="Billing-title-containter">
          <div className="Billing-form-container">
            <form>
              <fieldset>
                <legend>Select a Plan:</legend>
                <input
                  type="checkbox"
                  name="creditname"
                  onChange={this.handleOneYPlanSelection}
                />: 1 Year Subscription - $99.99<br />
                <input
                  type="checkbox"
                  name="creditname"
                  onChange={this.handleOneLPlanSelection}
                />: 1 Loan - $9.99
              </fieldset>
            </form>
            <p>Pay with a Credit/Debit Card</p>
            <CardElement />
            <button onClick={this.submitBillingInfo}>Submit</button>
          </div>
        </div>
        <SideBarNav />
      </div>
    );
  }
}
