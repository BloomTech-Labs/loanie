import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-signin-container">
        <div className="App-signin-border">
          <Link className="App-signin-item" to="/">Sign In</Link> <Link className="App-signin-item" to="/">Sign Up</Link>
        </div>
      </div>
      <div className="App-text-container">
        <p className="App-text-item"> Make your home purchases and mortgages easy and simple!</p>
      </div>
      <div className="button-container">
        <button className="button1 button "> Buy Now </button>
      </div>
    </div>
  );
}

export default App;
