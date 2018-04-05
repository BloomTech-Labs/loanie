import React, { Component } from 'react';
import './App.css';
import Navbar from './Component/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginState: false,
    };
    this.handlePurchase = this.handlePurchase.bind(this);
  }
  handlePurchase() {
    this.setState({ loginState: true });
    console.log(this.state.loginState);
    window.location = '/purchase_loanie';
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="App-text-container">
          <p className="App-text-item"> Make your home purchases and mortgages easy and simple!</p>
        </div>
        <div className="button-container">
          <button className="button1 button" onClick={this.handlePurchase}>
            {' '}
            Buy Now{' '}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
