import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerLoans } from '../Actions';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class OpenLoans extends Component {
	componentDidMount() {
		this.props.dispatch(getManagerLoans("000000000000000000000001"));
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
    loansBySingleManager: state.loans
  };
};

export default connect(mapStateToProps)(OpenLoans);