import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      loginState: false,
    };
  }
  componentDidMount() {
    console.log(this.state.loginState);
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/"><h1 className="App-title-item" >Loanie</h1></Link>
          </div>
          <ul className="App-signin-container">
            <li>
              <Link className="App-signin-item" to="/login_user">
                  Sign In
              </Link >
              <Link className="App-signup-item" to="/new_account">
                  Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
