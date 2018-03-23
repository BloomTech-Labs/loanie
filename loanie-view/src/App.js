import React from 'react';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
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
