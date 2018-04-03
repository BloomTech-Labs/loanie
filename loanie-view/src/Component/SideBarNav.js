import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: 'grey',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export default class SideBarNav extends Component {
  constructor() {
    super();
    this.state = {
      email: 'johnexample@email.com',
      phoneNumber: '123-456-7890',
      displayName: 'John',
      password: '**************',
      tokenId: sessionStorage.getItem('tokenId'),
    };
  }
  render() {
    return (
      <Menu styles={styles}>
        <a id="home" className="menu-item" href="/loan_list">
          Open Loans
        </a>
        <a id="about" className="menu-item" href="/closed_loans">
          Closed
        </a>
        <a id="contact" className="menu-item" href="/billing">
          Billing
        </a>
        <a id="contact" className="menu-item" href="/settings">
          Settings
        </a>
      </Menu>
    );
  }
}
