import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';
// import { getManagerLoans } from '../Actions';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class OpenLoans extends Component {
	constructor () {
		super();
		this.state = {
			tokenId: sessionStorage.getItem('tokenId'),
			loanManagerId: "",
			loans: [],
		};
	}

	componentDidMount() {
		const body = {
      token: this.state.tokenId
    };

    axios
      .post('http://localhost:3030/user', body)
      .then((res) => {
        console.log('res name', res.data.name);
        this.setState({loanManagerId: res.data._id});
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

			console.log("loanManagerId from bodya: ", bodya.loanManagerId);
			axios
			.post('http://localhost:3030/getmanagerloans', bodya)
			.then((res) => {
				this.setState({loans: res.data});
			console.log('loans', res);
			})
			.catch((err) => {
			console.log('Unable to fetch loan data.', err);
			})
	}

	handleGetAllOpenLoans = () => {
		const openLoans =  this.state.loans.filter(loan => parseInt(loan.currentStatus) < 4);
		return openLoans;
	}

	render() {
		const loans = this.handleGetAllOpenLoans();
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

		return(
			<div className="card-columns">
				{cards}
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