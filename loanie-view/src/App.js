import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className = "App">
        <div className = "App-signin-container">
          <div className = "App-signin-border">
            <Link className = "App-signin-item" to = "/">Sign In</Link> <Link className = "App-signin-item" to = "/">Sign Up</Link>
          </div>
        </div>
        <div className = "App-image-container">
          <img src = "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1513511668000/photosp/c3117d24-fd66-42c7-a01e-fe9e3e55dca7/stock-photo-building-house-hands-savings-insurance-estate-real-estate-loan-mortgage-c3117d24-fd66-42c7-a01e-fe9e3e55dca7.jpg" className = "App-frontpage-image"/>
        </div>
        <div className ="App-title-container">
          <h1 className = "App-title-item"> Loanie </h1>
        </div>
        <div className ="App-title-container">
          <p className = "App-text-item"> The app to make your home purchases easy and simple!</p>
        </div>
        <div className = "button-container">
          <button className = "button1 button "> Buy Now </button>
        </div>
      </div>
    );
  }
}

export default App;
