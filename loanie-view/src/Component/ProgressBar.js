import React, { Component } from 'react';
import '../CSS/ProgressBar.css';

export default class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      progressValue: 50,
      currentPhase: 'Phase 2',
    };
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
        </div>
        <div className="progress ProgressBar-container">
          <div
            className="progress-bar ProgressBar-style progress-bar-success"
            role="progressbar"
            aria-valuenow={this.state.progressValue}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${((this.state.progressValue / 25) * (75 / 4))}em` }}
          >
            {this.state.currentPhase}
          </div>
        </div>
      </div>
    );
  }
}
