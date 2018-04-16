import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardText,
  CardBody,
} from 'reactstrap';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import '../CSS/MyLoans.css';
import '../CSS/LoanList.css';

export default class MyLoans extends Component {
  constructor() {
    super();
    this.state = {
      loanList: [],
      userType: sessionStorage.getItem('userType'),
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  componentWillMount() {
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        // gran client email to use for next request
        const userEmail = { clientEmail: res.data.email };
        axios
          .post('http://localhost:3030/getclientloans', userEmail)
          .then((loandata) => {
            // grabs client loans based on email
            this.setState({ loanList: loandata.data });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
  render() {
    // grab user type and token id to make sure user is authorized
    const token = this.state.tokenId;
    const user = this.state.userType;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    if (user === 'managerUser') {
      return (
        <div>
          <h1> Please login to as a standard user </h1>
        </div>
      );
    }
    // renders if loan list is not empty
    if (this.state.loanList.length !== 0) {
      return (
        <div>
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
            {this.state.loanList.map((val, index) =>
              (
                <div className="MyLoans-loancard">
                  <Card>
                    <CardHeader>
                      <Link to={`my_loan/${val._id}`}>
                        <h5><b>Loan</b> {index + 1}</h5>
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        <ul className="list-unstyled">
                          <li>
                            <p className="MyLoans-text"><b>Current Phase</b>: {val.currentStatus}</p>
                          </li>
                          <li>
                            <p className="MyLoans-text"><b>Loan Type</b>: {val.loanType}</p>
                          </li>
                          <li>
                            <Link to={`my_loan/${val._id}`}>
                              <p className="MyLoans-text"><b>See Details</b></p>
                            </Link>
                          </li>
                        </ul>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </div>
          <ClientSideNav />
        </div>
      );
    }
    // renders if loan list is empty and user authorized
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
