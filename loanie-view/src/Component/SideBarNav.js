import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import axios from 'axios';
import '../CSS/SideBar.css';

export default class SideBarNav extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      userType: sessionStorage.getItem('userType'),
      userName: '',
    };
  }
  componentDidMount() {
    const base = 'https://loanie.herokuapp.com' || 'http://localhost:3030';
    const body = { token: this.state.tokenId };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        this.setState({ userName: res.data.name });
      })
      .catch((err) => {
        throw err;
      });
  }
  render() {
    if (this.state.userType === 'managerUser') {
      return (
        <div className="menu-container">
          <Menu>
            <Link to="/settings">
              <h4 className="menu-items">
                <b>{this.state.userName}</b>
              </h4>
            </Link>
            <a className="menu-items" href="/create_loan">
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
            <Link to="/user_settings">
              <h4 className="menu-items">
                <b>{this.state.userName}</b>
              </h4>
            </Link>
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
