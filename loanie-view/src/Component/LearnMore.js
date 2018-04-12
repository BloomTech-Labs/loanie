import React, { Component } from 'react';
import SidebarNav from './SideBarNav';
import Navbar from './Navbar';
import '../CSS/LearnMore.css';

export default class LearnMore extends Component {
  constructor() {
    super();
    this.state = {
      loginState: false,
    };
  }
  handlePurchase = () => {
    this.setState({ loginState: true });
    console.log(this.state.loginState);
    window.location = '/learn_more';
  };
  render() {
    return (
      <div className="LearnMore">
        <Navbar />
        <SidebarNav />
        <div className="Learn-container-opacity">
          <div className="Learn-header">
            <h1>Why Loanie?</h1>
          </div>
          <div className="Learn-text-container">
            <p className="Learn-text-item">
              Loanie is the cutting edge tool that takes all the guess work out of getting a
              mortgage.
            </p>
            <p className="Learn-text-list">
              <ul>
                <li>No more phone tag.</li>
                <li>
                  No more wondering if you sent the correct document or if your documents were
                  accepted.
                </li>
                <li>No more conflicting schedules slowing you down.</li>
                <li>
                  Loanie is here 24 hours a day, 7 days a week to track every step of your mortgage
                  process so you can relax and enjoy life.
                </li>
              </ul>
              <p className="Learn-text-item">
                Loanie breaks the mortgage process down into phases. In each phase your loan officer
                provides a simple list of assignments. As each assignment is completed you receive
                an optional text or email letting you know the loan officer has acknowledge the
                completion of each assignment.
              </p>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
