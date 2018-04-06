import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerLoans } from '../Actions';
import '../CSS/OpenAndClosedLoans.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class ClosedLoans extends Component {
  componentDidMount() {
    this.props.dispatch(getManagerLoans(""));
  }
<<<<<<< HEAD

  handleGetAllClosedLoans = () => {
    const closedLoans = this.props.loansBySingleManager.filter(loan => parseInt(loan.currentStatus) === 4);
    return closedLoans;
=======
  submitNewLoan() {
    console.log(this.state.username);
>>>>>>> 14a68d708255417b8aee6f06873cd46035a58ae7
  }

  render() {
    const loans = this.handleGetAllClosedLoans();
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

export default connect(mapStateToProps)(ClosedLoans);