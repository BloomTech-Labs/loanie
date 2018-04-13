import React, { Component } from "react";
import axios from "axios";
import ReactTelephoneInput from "react-telephone-input/lib/withStyles";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import firebase from "./Firebase";
import Navbar from "./Navbar";
import ClientSideNav from "./ClientSideNav";

import "../CSS/Settings.css";

export default class BorrowerSettings extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      originalEmail: "",
      email: "",
      phoneNumber: "",
      acceptTexts: null,
      acceptEmails: null,
      tokenId: sessionStorage.getItem("tokenId"),
      password: "",
    };
  }

  componentDidMount() {
    let base = process.env.BASE_URL || "http://localhost:3030";
    console.log(this.state.tokenId);
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post(`${base}/user`, body)
      .then(res => {
        this.setState({
          name: res.data.name,
          originalEmail: res.data.email,
          email: res.data.email,
          phoneNumber: res.data.mobilePhone,
          acceptTexts: res.data.acceptTexts,
          acceptEmails: res.data.acceptEmails,
        });
        console.log("Response from server: ", res);
      })
      .catch(err => {
        console.log("Unable to fetch user data.", err);
      });
  }

  handleTextAlerts = () => {
    this.setState({ acceptTexts: !this.state.acceptTexts });
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmails: !this.state.acceptEmails });
  };

  submitChanges = () => {
    console.log("sending to DB");
    this.sendToDB();
    // window.location = '/my_loans';
  };

  sendToDB = () => {
    // check to see if email changed
    if (this.state.email !== this.state.originalEmail) {
      firebase
        .signInAndRetrieveDataWithEmailAndPassword(
          this.state.originalEmail,
          this.state.password
        )
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            console.log("Wrong password.");
          } else {
            console.log(errorMessage);
          }
          console.log(error);
        });

      firebase
        .auth()
        .updateEmail(this.state.email)
        .then(() => {
          this.send();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.send();
    }
  };

  send = () => {
    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      mobilePhone: this.state.phoneNumber,
      acceptTexts: this.state.acceptTexts,
      acceptEmails: this.state.acceptEmails,
      token: this.state.tokenId,
    };
    console.log("sending to db:", userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then(res => {
        console.log("Success response: ", res);
      })
      .catch(err => {
        console.log("Failed to make changes to user!", err);
      });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handlePhoneChange = (telNumber, selectedCountry) => {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
    this.setState({ phoneNumber: telNumber });
  };

  handleInputBlur = (telNumber, selectedCountry) => {
    console.log(
      "Focus off the ReactTelephoneInput component. Tel number entered is: ",
      telNumber,
      " selected country is: ",
      selectedCountry
    );
  };

  render() {
    // render getter
    const token = this.state.tokenId;
    console.log(sessionStorage.getItem("tokenId"));
    console.log("state tokenId:", token);
    console.log("response: ", sessionStorage.getItem("res"));
    if (token === null || token === undefined || token === "") {
      window.location = "/login_user";
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    return (
      <div className="Settings">
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/my_loans">
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
                  value={this.state.name || ""}
                  onChange={this.handleNameChange}
                />
              </div>
              <br />
              <br />
              <div>
                <p>Phone Number:</p>{" "}
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
              <div>
                <input
                  type="checkbox"
                  name="acceptText"
                  defaultChecked={this.state.acceptTexts}
                  onChange={this.handleTextAlerts}
                />{" "}
                I would like to recieve TEXT notifications about my loan
              </div>
              <br />
              <div>
                <input
                  type="checkbox"
                  name="acceptEmail"
                  defaultChecked={this.state.acceptEmails}
                  onChange={this.handleEmailAlerts}
                />{" "}
                I would like to recieve EMAIL notifications about my loan
              </div>
              <button onClick={this.sendToDB}>Submit</button>
            </fieldset>
          </form>
        </div>
        <Navbar />
        <ClientSideNav />
      </div>
    );
  }
}
