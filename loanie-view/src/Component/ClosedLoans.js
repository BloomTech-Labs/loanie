import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { connect } from 'react-redux';
// import { getManagerLoans } from '../Actions';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class ClosedLoans extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: '',
      loans: [],
    };
  }

  componentDidMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({
          loanManagerId: res.data._id,
        });
        console.log('Response from server: ', res);
        this.handleGetClosedLoans()
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
    // this.props.dispatch(getManagerLoans("000000000000000000000001"));
  }

  handleGetClosedLoans = () => {
    const bodya = {
      loanManagerId: this.state.loanManagerId,
    };

      console.log("loanManagerId from bodya: ", bodya.loanManagerId);
      axios
      .post('http://localhost:3030/getmanagerloans', bodya)
      .then((res) => {
        this.setState({ loans: res.data });
        console.log('loans', res);
      })
      .catch((err) => {
        console.log('Unable to fetch loan data.', err);
      })
  }

  handleGetAllClosedLoans = () => {
    const closedLoans = this.state.loans.filter(loan => parseInt(loan.currentStatus, 0) === 4);
    return closedLoans;
  }

  render() {
    const loans = this.handleGetAllClosedLoans();
    if (loans.length === 0) {
      return (
        <div className="card-columns">
          <Navbar />
          <div className="BreadCrumb">
            <Breadcrumb>
              <BreadcrumbItem tag="a" href="/">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem active>Loans</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="ClosedLoans-header">
            <h2> No closed loans! </h2>
          </div>
          <SideBarNav />
        </div>
      );
    }
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(
        <div key={index} className="card box-shadow">
          <div className="card-header">
            <h4 className="my-0">Loan {index + 1}</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>Hey</li>
              <li>Client Id: {loan.clientId}</li>
              <li>Current Status: {loan.currentStatus}</li>
            </ul>
          </div>
        </div>);
    });

    return (
<<<<<<< HEAD
      <div className="card-columns">
        {cards}
      </div>
=======
      <div>
            <Navbar />
            <SideBarNav />
            <div className="BreadCrumb">
              <Breadcrumb>
                <BreadcrumbItem tag="a" href="/">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem active>Loans</BreadcrumbItem>
              </Breadcrumb>
              <div className="ClosedLoans-header">
              <h2> No closed loans! </h2>
              </div>
              </div>
              <div className="card-columns">
              {cards}
              </div>
              </div>
>>>>>>> 9909a34cc4e035e3581ef6066a42ee4685062cf8
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     loansBySingleManager: state.loans
//   };
// };

 // connect(mapStateToProps)(ClosedLoans);