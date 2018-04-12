import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
// import { connect } from 'react-redux';
// import { getManagerLoans } from '../Actions';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

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
    const body = { token: this.state.tokenId };
    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({
          loanManagerId: res.data._id,
        });
        console.log('Response from server: ', res);
        this.handleGetClosedLoans();
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
    // this.props.dispatch(getManagerLoans("000000000000000000000001"));
  }

  handleGetClosedLoans = () => {
    const body = {
      loanManagerId: this.state.loanManagerId,
    };

    console.log('loanManagerId from body: ', body.loanManagerId);
    axios
      .post('http://localhost:3030/getmanagerloans', body)
      .then((res) => {
        this.setState({ loans: res.data });
        console.log('loans', res);
      })
      .catch((err) => {
        console.log('Unable to fetch loan data.', err);
      })
  }

  handleGetAllClosedLoans = () => {
    console.log('loans get all closed handler', this.state.loans);
    const closedLoans = this.state.loans.filter(loan => loan.loanOpen === false);
    console.log('closed loans', closedLoans);
    return closedLoans;
  }

  render() {
    const loans = this.handleGetAllClosedLoans();
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(<Card>
        <CardHeader>Loan {index + 1}</CardHeader>
        <CardBody>
          <CardText>
            <ul className="list-unstyled">
              <li>Hey</li>
              <li>Client email: {loan.clientEmail}</li>
              <li>Current Status: {loan.currentStatus}</li>
              <Link to={`my_loan/${loan._id}`}>
                See Details
              </Link>
            </ul>
          </CardText>
        </CardBody>
      </Card>);
    });

    let noCards = null;
    if (loans.length === 0) {
      noCards = [];
      noCards.push(<div className="NoClosedLoans-header"><h2> No closed loans! </h2></div>);
      noCards.push(<SideBarNav />);
    }

    return (
      <div>
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            {' > '}
            <BreadcrumbItem active>Closed Loans</BreadcrumbItem>
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
//     loansBySingleManager: state.loans
//   };
// };

// connect(mapStateToProps)(ClosedLoans);
