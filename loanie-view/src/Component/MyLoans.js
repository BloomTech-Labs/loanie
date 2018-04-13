import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardText,
  CardBody,
} from "reactstrap";
import Navbar from "./Navbar";
import ClientSideNav from "./ClientSideNav";
import "../CSS/MyLoans.css";
import "../CSS/LoanList.css";

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      loanList: [],
      userType: sessionStorage.getItem("userType"),
      tokenId: sessionStorage.getItem("tokenId"),
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  componentWillMount() {
    let base = process.env.BASE_URL || "http://localhost:3030";
    // console.log(this.state.userType);
    // console.log('hello');
    // console.log(this.state.tokenId);
    const body = { token: this.state.tokenId };
    axios
      .post(`${base}/user`, body)
      .then(res => {
        const userEmail = { clientEmail: res.data.email };
        // console.log('hello');
        console.log("email to get loans", res.data.email);
        axios
          .post(`${base}/getclientloans`, userEmail)
          .then(loandata => {
            this.setState({ loanList: loandata.data });
            //  console.log(this.state.loanList);
            console.log(this.state.loanList);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  selectLoan() {
    console.log(this.state.username);
  }
  render() {
    // render getter
    const token = this.state.tokenId;
    const user = this.state.userType;
    // console.log(sessionStorage.getItem('tokenId'));
    // console.log('state tokenId:', token);
    // console.log(this.state.username);
    // console.log(this.state.userType);
    if (token === null || token === undefined || token === "") {
      window.location = "/login_user";
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    if (user === "managerUser") {
      return (
        <div>
          <h1> Please login to as a standard user </h1>
        </div>
      );
    }
    if (this.state.loanList.length !== 0) {
      return (
        <div className="MyLoans">
          <div className="BreadCrumb">
            <Breadcrumb>
              <BreadcrumbItem tag="a" href="/">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem active>Loans</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Navbar />
          <div className="MyLoans-link-container">
            {this.state.loanList.map((val, index) => {
              return (
                <div className="MyLoans-loancard">
                  <Card>
                    <CardHeader>
                      <Link to={`my_loan/${val._id}`}>
                        <h5>
                          <b>Loan</b> {index + 1}
                        </h5>
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        <ul className="list-unstyled">
                          <li>
                            <p className="MyLoans-text">
                              <b>Current Phase</b>: {val.currentStatus}
                            </p>
                          </li>
                          <li>
                            <p className="MyLoans-text">
                              <b>Loan Type</b>: {val.loanType}
                            </p>
                          </li>
                          <li>
                            <Link to={`my_loan/${val._id}`}>
                              <p className="MyLoans-text">
                                <b>See Details</b>
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
          <ClientSideNav />
        </div>
      );
    }
    return (
      <div className>
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Navbar />
        <div className="MyLoans-noloans-text">
          <h2>You currently do not have any active loans.</h2>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
