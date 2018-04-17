import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/Billing.css';

class Billing extends Component {
  // have to use camel case method proptypes not the one from import
  propTypes = {
    stripe: PropTypes.func,
    createToken: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      stripeToken: '',
      name: '',
      creditCardNumber: '',
      creditCardExperation: '',
      loanPlan: '',
      email: '',
    };
  }

  getBillingRoute = () => {
    if (sessionStorage.getItem('userType') === 'managerUser') {
      return '/open_loans';
    }
    return '/my_loans';
  };

  getUserId = () => {
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    const info = { email: this.state.email };
    axios
      .post(`${base}/userbyemail`, info)
      .then((res) => {
        console.log('found ID', res.data.UID);
        this.elevateUser(res.data.UID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendStripeToken() {
    console.log('sending stripe token to server!');
    console.log('loanPlan on state', this.state.loanPlan);
    const body = {
      loanPlan: this.state.loanPlan,
      stripeToken: this.state.stripeToken,
      email: this.state.email,
    };
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    axios
      .post(`${base}/stripe`, body)
      .then((res) => {
        console.log('Response from server: ', res);
        this.getUserId();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  elevateUser = (id) => {
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    let subDate = '';
    if (this.state.loanPlan === 'Full Year Subscription') {
      subDate = moment(Date.now())
        .add(1, 'years')
        .format('MMMM Do YYYY, h:mm:ss a');
    }

    // comment to test expiration
    if (this.state.loanPlan === 'Single Loan') {
      subDate = moment(Date.now())
        .add(30, 'days')
        .format('MMMM Do YYYY, h:mm:ss a');
    }

    // uncomment to test expiration
    // if (this.state.loanPlan === 'Single Loan') {
    //   subDate = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
    // }

    console.log(subDate);
    const userInfo = {
      token: id,
      userType: 'managerUser',
      subExp: subDate,
    };

    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        console.log('Success response: ', res);
        sessionStorage.setItem('userType', 'managerUser');
        window.location = '/open_loans';
      })
      .catch((err) => {
        console.log('Failed to make changes to user!', err);
      });
  };

  submitBillingInfo() {
    console.log(this.state.username);
    console.log(this.state.creditCardExperation);
  }

  handleCreditCardNumber(event) {
    this.setState({ creditCardNumber: event.target.value });
    console.log(this.state.creditCardNumber);
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleOneYPlanSelection = () => {
    this.setState({ loanPlan: 'Full Year Subscription' });
    console.log(this.state.loanPlan);
  };

  handleOneLPlanSelection = () => {
    this.setState({ loanPlan: 'Single Loan' });
    console.log(this.state.loanPlan);
  };

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
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href={this.getBillingRoute()}>
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Billing</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Billing-title-containter">
          <div className="Billing-form-container">
            <form>
              <fieldset>
                <legend>Select a Plan:</legend>
                <input
                  type="checkbox"
                  name="loanPlan"
                  onChange={this.handleOneYPlanSelection}
                />{' '}
                Full Year Subscription - $99.99<br />
                <input
                  type="checkbox"
                  name="loanPlan"
                  onChange={this.handleOneLPlanSelection}
                />{' '}
                Single Loan - $9.99<br />
                <br />
                <legend>Credit/Debit Card Details: </legend>
                Name as it appears on card:{' '}
                <input type="text" name="name" onChange={this.handleNameChange} />
              </fieldset>
              <CardElement />
              <br />
              <legend>Email Address Of The User To Be Granted Loan Officer Privileges: </legend>
              Email Address: <input type="text" name="email" onChange={this.handleEmailChange} />
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
        <SidebarNav />
      </div>
    );
  }
}

export default injectStripe(Billing);
