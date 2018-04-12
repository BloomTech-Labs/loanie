import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardColumns,
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
      username: '',
      loanList: [],
      userType: sessionStorage.getItem('userType'),
      tokenId: sessionStorage.getItem('tokenId'),
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  componentDidMount() {
    // console.log(this.state.userType);
    // console.log('hello');
    // console.log(this.state.tokenId);
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        const userEmail = res.data.email;
        // console.log('hello');
        // console.log(res.data.email);
        axios
          .post('http://localhost:3030/getclientloans', userEmail)
          .then((loandata) => {
            console.log(loandata.data);
            this.setState({ loanList: loandata.data });
            //  console.log(this.state.loanList);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
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
    if (this.state.loanList !== '') {
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
                        <h5>Loan {index + 1}</h5>
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        <ul className="list-unstyled">
                          <li>
                            <p className="MyLoans-text">Current Phase: {val.currentStatus}</p>
                          </li>
                          <li>
                            <p className="MyLoans-text">Loan Type: {val.loanType}</p>
                          </li>
                          <li>
                            <Link to={`my_loan/${val._id}`}>
                              <p className="MyLoans-text">See Details</p>
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
        <div>
          <h1>Open Loans</h1>
          <br />
          <h1>Closed Loans</h1>
          <h1>My Loans</h1>
          <h2>You currently do not have any active loans.</h2>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
