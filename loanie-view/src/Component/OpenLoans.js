import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import axios from 'axios';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardText,
  CardColumns,
  CardBody,
} from 'reactstrap';
// import { getManagerLoans } from '../Actions';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class OpenLoans extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: '',
      loans: [],
    };
  }

  componentDidMount() {
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({ loanManagerId: res.data._id });
        console.log('loanManagerId from open loans: ', res.data._id);
        console.log('Response from server: ', res);
        this.handleGetOpenLoans();
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });

    // console.log("User email: ", this.props.userLoginDetails.email);
    // console.log("this.props.userLoginDetails: ", this.props.userLoginDetails);
    // this.props.dispatch(getManagerLoans("000000000000000000000001"));
  }

  handleGetOpenLoans = () => {
    const body = {
      loanManagerId: this.state.loanManagerId,
    };

    console.log('loanManagerId from body: ', body.loanManagerId);
    axios
      .post('http://localhost:3030/getmanagerloans', body)
      .then((res) => {
        this.setState({ loans: res.data });
        // this.setState({ loans: [] });
        console.log('loans', res);
      })
      .catch((err) => {
        console.log('Unable to fetch loan data.', err);
      });
  }

  handleGetAllOpenLoans = () => {
    const openLoans = this.state.loans.filter(loan => parseInt(loan.currentStatus, 0) < 6);
    return openLoans;
  }

  render() {
    const loans = this.handleGetAllOpenLoans();
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(
        <div className="OpenLoans-card-container">
          <Card>
            <CardHeader><b>Loan {index + 1}</b></CardHeader>
            <CardBody>
              <CardText>
                <ul className="list-unstyled">
                  <li>Client email: {loan.clientEmail}</li>
                  <li>Current Status: {loan.currentStatus}</li>
                  <Link to={`my_loan/${loan._id}`}>
                    See Details
                  </Link>
                  {' | '}
                  <Link to={`edit_loan/${loan._id}`}>
                    Edit
                  </Link>
                  {' | '}
                  <Link to={`add_assignment/${loan._id}`}>
                    Add Assignment
                  </Link>
                </ul>
              </CardText>
            </CardBody>
          </Card>
        </div>,
      );
      if (index === loans.length - 1) {
        cards.push(
          <div className="OpenLoans-card-container">
            <Card>
              <div className="list-unstyled OpenLoans-imagelist-container">
                <CardHeader><h7><b> Add a New Loan</b></h7></CardHeader>
                <Link to="/create_loan">
                  <img
                    className="OpenLoans-imagelist-item"
                    src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-256.png"
                    alt="plus_sign"
                  />
                </Link>
              </div>
            </Card>
          </div>);
      }
    });

    const noCards = [];
    if (this.state.loans.length === 0) {
      return (
        <div>
          <Navbar />
          <div className="BreadCrumb">
            <Breadcrumb>
              <BreadcrumbItem tag="a" href="/">
                Home
              </BreadcrumbItem>
              {' > '}
              <BreadcrumbItem active>Open Loans</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <CardColumns>
            {cards}
          </CardColumns>
          {noCards}
          <div className="OpenLoans-image-container">
            <h1> Add a New Loan</h1>
            <Link to="/create_loan">
              <img
                className="OpenLoans-image-item"
                src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-256.png"
                alt="plus_sign"
              />
            </Link>
          </div>
          <SideBarNav />
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem active>Open Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <CardColumns>
          {cards}
        </CardColumns>
        {noCards}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     loansBySingleManager: state.loans,
//     //userLoginDetails: state.userLoginDetails,
//   };
// };

// connect(mapStateToProps)(OpenLoans);
