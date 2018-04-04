import React, { Component } from 'react';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';
import ProgressBar from './ProgressBar';
import '../CSS/MyLoans.css';

export default class ClientSelectedLoan extends Component {
  constructor() {
    super();
    this.state = {
      username: 'billy',
      assignments: ['assignment 1', 'assignment 2', 'assignment 3', 'assignment 4', 'assignment 5'],
      checked: ['true', 'true', 'true', 'false', 'false'],
      borrower: 'Joe',
      coBorrower: 'Bob',
      type: 'New Purchase',
    };
    this.selectLoan = this.selectLoan.bind(this);
  }
  selectLoan() {
    console.log(this.state.username);
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="MyLoans-title-container">
          <h1><b>Loan Progress</b></h1>
        </div>
        <div className="MyLoans-container">
          <div className="MyLoans-borrower-container">
            <p><b>Borrower: </b>{this.state.borrower}</p>
            <p><b>Co-Borrower: </b>{this.state.coBorrower}</p>
            <p><b>Type: </b>{this.state.type}</p>
          </div>
          <div className="Myloans-progress-container">
            <ProgressBar />
          </div>
        </div>
        <div className="MyLoans-content-container">
          <div className="MyLoans-assignment-container">
            <div className="MyLoans-input-container">
              <div className="MyLoans-p1-item">
                <p> Your loan officer will update these boxes as they recieve your documents</p>
              </div>
              <br />
              {this.state.assignments.map((val, index) => {
                if (this.state.checked[index] !== 'false') {
                  return (
                    <p>{val} <input type="checkbox" disabled="disabled" checked /></p>
                  );
                }
                return (
                  <p>{val} <input type="checkbox" disabled="disabled" /></p>
                );
              })}
            </div>
            <br /><p> If you have any questions call Bob Officer: <br />1-800-000-000</p>
          </div>
          <div className="MyLoans-text-container">
            <textbox className="MyLoans-text-item">
              <p>
              In finance, a loan is the lending of money from one individual, organization or
              entity to another individual, organization or entity. A loan is a debt provided
              by an organization or individual to another entity at an interest rate, and
              evidenced by a promissory note which specifies, among other things, the
              principal amount of money borrowed, the interest rate the lender is charging,
              and date of repayment. A loan entails the reallocation of the subject asset(s)
              for a period of time, between the lender and the borrower.
              </p>
              <p>
                In a loan, the borrower initially receives or borrows an amount of money,
              called the principal, from the lender, and is obligated to pay back or repay
              an equal amount of money to the lender at a later time. The loan is generally
              provided at a cost, referred to as interest on the debt, which provides an
              incentive for the lender to engage in the loan. In a legal loan, each of
              these obligations and restrictions is enforced by contract, which can also
              place the borrower under additional restrictions known as loan covenants.
              Although this article focuses on monetary loans, in practice any material
              object might be lent. Acting as a provider of loans is one of the
              principal tasks for financial institutions such as banks and credit
              card companies. For other institutions, issuing of debt contracts such
              as bonds is a typical source of funding.
              </p>
            </textbox>
          </div>
        </div>
        <ClientSideNav />
      </div>
    );
  }
}
