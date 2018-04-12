import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../CSS/SideBar.css';

export default class SideBarNav extends Component {
  constructor() {
    super();
    this.state = {
      userType: sessionStorage.getItem('userType'),
    };
  }
  render() {
    if (this.state.userType === 'managerUser') {
      return (
        <div className="menu-container">
          <Menu>
            <a className="menu-items" href="/loan_list">
              Create Loan
            </a>
            <a className="menu-items" href="/open_loans">
              Open Loans
            </a>
            <a className="menu-items" href="/closed_loans">
              Closed Loans
            </a>
            <a className="menu-items" href="/billing">
              Billing
            </a>
            <a className="menu-items" href="/settings">
              Settings
            </a>
          </Menu>
        </div>
      );
    } else if (this.state.userType === 'standardUser') {
      return (
        <div className="menu-container">
          <Menu>
            <a className="menu-items" href="/">
              Home
            </a>
            <a className="menu-items" href="/my_loans">
              My Loans
            </a>
            <a className="menu-items" href="/user_settings">
              Settings
            </a>
          </Menu>
        </div>
      );
    }
    return <div />;
  }
}
