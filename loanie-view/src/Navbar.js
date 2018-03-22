import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default class NavBar extends Component{

  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <h1 className="App-title-item" >Loanie</h1>
          </div>
          <ul className="App-signin-container">
            <li>
              <Link className = "App-signin-item" to = "/">
                  Sign In
              </Link >
              <Link className = "App-signup-item" to = "/">
                  Sign Up
              </Link> 
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}