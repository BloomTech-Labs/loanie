import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getManagerLoans } from '../Actions';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class OpenLoans extends Component {
	constructor () {
		super();
		this.state = {
			tokenId: sessionStorage.getItem('tokenId'),
		};
	}

	componentDidMount() {
		// console.log("User email: ", this.props.userLoginDetails.email);
		// console.log("this.props.userLoginDetails: ", this.props.userLoginDetails);
		// this.props.dispatch(getManagerLoans(this.props.userLoginDetails._id));
	}

	handleGetAllOpenLoans = () => {
		const openLoans = this.props.loansBySingleManager.filter(loan => parseInt(loan.currentStatus) < 4);
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

const mapStateToProps = (state) => {
  return {
    loansBySingleManager: state.loans,
    userLoginDetails: state.userLoginDetails,
  };
};

export default connect(mapStateToProps)(OpenLoans);