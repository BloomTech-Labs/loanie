import React, { Component } from 'react';
import axios from 'axios';

export default class PhaseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: '',
    };
  }
  componentDidMount() {
    console.log(this.state.progressValue);
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${getLoanId}`)
      .then((loandata) => {
        console.log(loandata.data.currentStatus);
        this.setState({
          currentPhase: `Phase ${loandata.data.currentStatus}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (this.state.currentPhase === 'Phase 1') {
      return (
        <div>
          <p>
          This is the "just getting started" phase. You should meet with your loan 
          officer to thoroughly review your finances, your needs, the market in your
          area, and all the other factors to make a plan. Home ownership can be a 
          journey. Your loan officer will be here every step of the way, and so will we. 
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 2') {
      return (
        <div>
          <p>
          You've started shopping for a home. Maybe you're working with a realtor, maybe
          you're own your own. Either way, there are some things you should know. You've
          likely been "prequalified" for a home loan. Its now time to get "preapproved".
          Any realtor will tell you that offers made by preapproved buyers are taken
          more seriously -- especially in competitive markets, so its important to sit
          down with your loan officer, review your financial situation, and get that
          preapproval. TL:DR; Preapproval comes with verification of
          debts/income/credit - Pre-qualification is based only on a "best guess".
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 3') {
      return (
        <div>
          <p>
          After we have a property and the offer has been submitted and accepted, its
          time to go to work. Your loan officer will need to collect a TON of paperwork
          from you. It is important to know that banks employ teams of professional
          nit-pickers to review these documents thoroughly, and they will find some things
          that will require additional documentation. This is a normal part of the
          process - be sure to provide any and all documentation to your loan officer
          as quickly as possible.
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 4') {
      return (
        <div>
          <p>
          Appraisal on the property is ordered and completed. Regulations require the buyer
           to pay for the appraisal. A professional appraiser will evaluate your property and
           compare it to other recent transactions in your market. You're entitled to a copy
           of this report, so ask for it. You'll likely find it interesting.
          </p>
        </div>
      );
    }else if (this.state.currentPhase === 'Phase 4') {
      return (
        <div>
          <p>
          Appraisal on the property is ordered and completed. Regulations require the buyer
           to pay for the appraisal. A professional appraiser will evaluate your property and
           compare it to other recent transactions in your market. You're entitled to a copy
           of this report, so ask for it. You'll likely find it interesting.
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 5') {
      return (
        <div>
          <p>
          The final disclosure is a lengthy document that contains all the terms of your loan.
          You should review this document thoroughly. In order to guarantee that you have time
          to review the document, you must wait at least three days from the time you sign and
          approve it and the time you close.
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
        You'll arrive at the Title Company and be seated in a conference room and asked to sign
        a stack of documents related to your mortgage. The title company representative will
        watching you so feel free to ask questions.
        </p>
      </div>
    );
  }
}
