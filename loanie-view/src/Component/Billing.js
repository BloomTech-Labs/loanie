import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';

import '../CSS/Billing.css';

class Billing extends Component {
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
  handleSubmit = (ev) => {
    console.log('props in submit', this.props);
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };
  render() {
    return (
      <div className="Billing">
        <Navbar />
        <div className="Billing-title-containter">
          <div className="Billing-form-container">
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <legend>Select a Plan:</legend>
                <input
                  type="checkbox"
                  name="creditname"
                  onChange={this.handleOneYPlanSelection}
                />{' '}
                Full Year Subscription - $99.99<br />
                <input
                  type="checkbox"
                  name="creditname"
                  onChange={this.handleOneLPlanSelection}
                />{' '}
                Single Loan - $9.99<br />
                <br />
              </fieldset>
              <p>Pay with a Credit/Debit Card</p>
              <CardElement />
              <button onClick={this.submitBillingInfo}>Submit</button>
            </form>
          </div>
        </div>
        <SideBarNav />
      </div>
    );
  }
}

export default injectStripe(Billing);
