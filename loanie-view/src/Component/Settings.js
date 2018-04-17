import React, { Component } from 'react';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import firebase from './Firebase';

import '../CSS/Settings.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      originalEmail: '',
      phoneNumber: '',
      name: '',
      password: '',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }

  componentDidMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        this.setState({
          name: res.data.name,
          originalEmail: res.data.email,
          email: res.data.email,
          phoneNumber: res.data.mobilePhone,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  submitChanges = () => {
    this.send();
    // window.location = '/my_loans';
  };

  sendToDB = () => {
    // check to see if email changed
    if (this.state.email !== this.state.originalEmail) {
      firebase
        .signInAndRetrieveDataWithEmailAndPassword(this.state.originalEmail, this.state.password)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            throw errorCode;
          } else {
            throw errorMessage;
          }
        });

      firebase
        .auth()
        .updateEmail(this.state.email)
        .then(() => {
          this.send();
        })
        .catch((error) => {
          throw error;
        });
    } else {
      this.send();
    }
  };

  send() {
    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      mobilePhone: this.state.phoneNumber,
      token: this.state.tokenId,
    };
    axios
      .post('http://localhost:3030/edituser', userInfo)
      .then((res) => {
        console.log('Success response: ', res);
      })
      .catch((err) => {
        throw err;
      });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePhoneChange = (telNumber, selectedCountry) => {
    console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    this.setState({ phoneNumber: telNumber });
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      'Focus off the ReactTelephoneInput component. Tel number entered is: ',
      telNumber,
      ' selected country is: ',
      selectedCountry,
    );
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
      <div className="Settings">
        <Navbar />
        <SideBarNav />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Settings-title-containter">
          <h1>Settings</h1>
        </div>
        <div className="Settings-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  name="name"
                  value={this.state.name || ''}
                  onChange={this.handleNameChange}
                />
              </div>
              <br />
              <br />
              <div>
                <p>Phone Number:</p>{' '}
                <ReactTelephoneInput
                  defaultCountry="us"
                  flagsImagePath=".\Images\flags.png"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneChange}
                  onBlur={this.handleInputBlur}
                />
              </div>
              <br />
              <br />
              <button onClick={this.sendToDB}>Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
