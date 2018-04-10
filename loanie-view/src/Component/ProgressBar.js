import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/ProgressBar.css';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: null,
      currentPhase: '',
    };
  }
  componentDidMount() {
    // grabs the current url
    let getLoanId = window.location.href;
    // grabs username inside current url
    getLoanId = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${getLoanId}`)
      .then((loandata) => {
        console.log(loandata.data.currentStatus);
        this.setState({
          currentPhase: loandata.data.currentStatus,
          progressValue: Number(loandata.data.currentStatus) * (100 / 6),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="ProgressBar">
        <div className="ProgressBar-phase-container ">
          <div className="ProgressBar-phase-item">
            <p><b>1</b></p>
          </div>
          <div className="ProgressBar-phase-item">
            <p><b>2</b></p>
          </div>
          <div className="ProgressBar-phase-item">
            <p><b>3</b></p>
          </div>
          <div className="ProgressBar-phase-item">
            <p><b>4</b></p>
          </div>
          <div className="ProgressBar-phase-item">
            <p><b>5</b></p>
          </div>
          <div className="ProgressBar-phase-item">
            <p><b>6</b></p>
          </div>
        </div>
        <div className="progress ProgressBar-container">
          <div
            className="progress-bar ProgressBar-style progress-bar-success"
            role="progressbar"
            aria-valuenow={this.state.progressValue}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${((this.state.progressValue / (100 / 6)) * (75 / 6))}em` }}
          >
            Phase {this.state.currentPhase}
          </div>
        </div>
      </div>
    );
  }
}
