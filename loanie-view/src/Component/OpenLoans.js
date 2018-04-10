import React, { Component } from 'react';
// import { connect } from 'react-redux';
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
// import { getManagerLoans } from '../Actions';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';
import '../CSS/OpenAndClosedLoans.css';
// 	import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class OpenLoans extends Component {
<<<<<<< HEAD
	constructor () {
		super();
		this.state = {
			tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: "",
			loans: [],
		};
	}
=======
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      loanManagerId: '',
      loans: [],
    };
  }
>>>>>>> 9909a34cc4e035e3581ef6066a42ee4685062cf8

  componentDidMount() {
    const body = {
      token: this.state.tokenId,
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({ loanManagerId: res.data._id });
        console.log('loanManagerId from open lona: ', res.data._id);
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
    const bodya = {
      loanManagerId: this.state.loanManagerId,
    };

    console.log('loanManagerId from bodya: ', bodya.loanManagerId);
    axios
      .post('http://localhost:3030/getmanagerloans', bodya)
      .then((res) => {
        this.setState({ loans: res.data });
        console.log('loans', res);
      })
      .catch((err) => {
        console.log('Unable to fetch loan data.', err);
      });
  };

  handleGetAllOpenLoans = () => {
    const openLoans = this.state.loans.filter(loan => parseInt(loan.currentStatus, 0) < 4);
    return openLoans;
  };

  render() {
    const loans = this.handleGetAllOpenLoans();
    const cards = [];
    loans.forEach((loan, index) => {
      cards.push(<div>
        <Card>
          <CardHeader>Loan {index + 1}</CardHeader>
          <CardBody>
            <ul className="list-unstyled">
              <CardText>
                <li>Hey</li>
                <li>Client email: {loan.clientEmail}</li>
                <li>Current Status: {loan.currentStatus}</li>
              </CardText>
            </ul>
          </CardBody>
        </Card>
      </div>);
    });

    let noCards = null;
    if (loans.length === 0) {
      noCards = [];
      noCards.push(<div className="NoOpenLoans-header">
                    <h2> No open loans! </h2>
                   </div>);
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
            <BreadcrumbItem active>Open Loans</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <CardColumns>{cards}</CardColumns>
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
