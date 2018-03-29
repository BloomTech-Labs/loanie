import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';

import '../CSS/Billing.css';

class Billing extends Component {
  constructor() {
    super();
    this.state = {
      stripeToken: '',
      name: '',
      creditCardNumber: '',
      creditCardExperation: '',
      loanPlan: '',
    };
    this.handleCreditCardNumber = this.handleCreditCardNumber.bind(this);
    this.submitBillingInfo = this.submitBillingInfo.bind(this);
    this.handleOneYPlanSelection = this.handleOneYPlanSelection.bind(this);
    this.handleOneLPlanSelection = this.handleOneLPlanSelection.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.sendStripeToken = this.sendStripeToken.bind(this);
  }
  sendStripeToken() {
    console.log('sending stripe token to server!');
    console.log('loanPlan on state', this.state.loanPlan);
    const body = {
      loanPlan: this.state.loanPlan,
      stripeToken: this.state.stripeToken,
    };
    axios
      .post('http://localhost:3030/stripe', body)
      .then((res) => {
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitBillingInfo() {
    console.log(this.state.username);
    console.log(this.state.creditCardExperation);
  }

  handleCreditCardNumber(event) {
    this.setState({ creditCardNumber: event.target.value });
    console.log(this.state.creditCardNumber);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleOneYPlanSelection() {
    this.setState({ loanPlan: 'Full Year Subscription' });
    console.log(this.state.loanPlan);
  }

  handleOneLPlanSelection() {
    this.setState({ loanPlan: 'Single Loan' });
    console.log(this.state.loanPlan);
  }

  handleSubmit = (e) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: this.state.name }).then(({ token }) => {
      this.setState({ stripeToken: token });
      console.log('Created Stripe token:', token);
      this.sendStripeToken();
    });
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
                  name="loanPlan"
                  onChange={this.handleOneYPlanSelection.bind(this)}
                />{' '}
                Full Year Subscription - $99.99<br />
                <input
                  type="checkbox"
                  name="loanPlan"
                  onChange={this.handleOneLPlanSelection.bind(this)}
                />{' '}
                Single Loan - $9.99<br />
                <br />
                <legend>Credit/Debit Card Details: </legend>
                Name as it appears on card:{' '}
                <input type="text" name="name" onChange={this.handleNameChange.bind(this)} />
              </fieldset>
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
