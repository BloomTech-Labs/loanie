import React, { Component } from 'react';
import axios from 'axios';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/Settings.css';

export default class BorrowerSettings extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      acceptTexts: null,
      acceptEmails: null,
      tokenId: sessionStorage.getItem('tokenId'),
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
          name: res.data.name,
          email: res.data.email,
          phoneNumber: res.data.mobilePhone,
          acceptTexts: res.data.acceptTexts,
          acceptEmails: res.data.acceptEmails,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  handleTextAlerts = () => {
    this.setState({ acceptTexts: !this.state.acceptTexts });
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmails: !this.state.acceptEmails });
  };

  submitChanges = () => {
    this.sendToDB();
    window.location = '/my_loans';
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
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
    console.log(sessionStorage.getItem('tokenId'));
    console.log('state tokenId:', token);
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
        <div className="Settings-title-containter">
          <h1>Settings</h1>
        </div>
        <div className="Settings-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              <div>
                <h4>Name:</h4>
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
                <h4>Email:</h4>{' '}
                <input
                  type="text"
                  name="email"
                  value={this.state.email || ''}
                  onChange={this.handleEmailChange}
                />
              </div>
              <br />
              <br />
              <div>
                <h4>Phone Number:</h4>{' '}
                <ReactTelephoneInput
                  defaultCountry="us"
                  flagsImagePath=".\Images\flags.png"
                  initialValue={this.state.phoneNumber || ''}
                  onChange={this.handlePhoneChange}
                  onBlur={this.handleInputBlur}
                />
              </div>
              <br />
              <br />
              <div>
                <input
                  type="checkbox"
                  name="acceptText"
                  defaultChecked={this.state.acceptTexts}
                  onChange={this.handleTextAlerts}
                />{' '}
                I would like to recieve TEXT notifications about my loan
              </div>
              <br />
              <div>
                <input
                  type="checkbox"
                  name="acceptEmail"
                  defaultChecked={this.state.acceptEmails}
                  onChange={this.handleEmailAlerts}
                />{' '}
                I would like to recieve EMAIL notifications about my loan
              </div>
              <br />
              <br />
              <button onClick={this.submitChanges}>Submit</button>
              <br />
              <br />
            </fieldset>
          </form>
        </div>
        <Navbar />
        <ClientSideNav />
      </div>
    );
  }
}
