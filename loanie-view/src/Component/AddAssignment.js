import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/AddAssignment.css';

class AddAssignment extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      assignmentPhase: '1',
      newAssignmentText: '',
      newAssignment: {},
      clientEmail: '',
      assignments: [],
    };
  }

  componentDidMount() {
    const getLoanId = window.location.href;
    const id = getLoanId.split('/').pop();
    axios
      .get(`http://localhost:3030/loan/${id}`)
      .then((res) => {
        console.log('res clientemail', res.data.clientEmail);
        this.setState({
          clientEmail: res.data.clientEmail,
          assignments: res.data.assignments,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  handleNewAssignment = (event) => {
    this.setState({ newAssignmentText: event.target.value });
    console.log(this.state.newAssignmentText);
  };

  submitNewAssignment() {
    console.log('sending', this.state.newAssignmentText);
    const assignment = {
      text: this.state.newAssignmentText,
      phase: this.state.assignmentPhase,
    };

    const body = {
      loanId: this.state.currentStatus,
      assignments: assignment,
    };
    console.log('body', body);
    axios
      .post('http://localhost:3030/assignment', body)
      .then(() => {
        console.log('Assignment created successfully!');
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });
  }

  MapAssignments() {
    return (
      <div>
        {this.state.assignments.map(assignment => (
          <div className="assignment" key={this.state.assignment.id}>
            <p>Phase: {assignment.phase}</p>
            <p>{assignment.text}</p>
          </div>
        ))}
      </div>
    );
  }

  handleDropDownPhase = (e) => {
    console.log(e.target.value);
    this.setState({ assignmentPhase: e.target.value });
  };

  autoresize = () => {
    this.style.height = 'auto';
    this.style.width = 'auto';
    this.style.height = this.scrollHeight.concat('px');
    this.scrollTop = this.scrollHeight;
    window.scrollTo(window.scrollLeft, this.scrollTop + this.scrollHeight);
  };

  render() {
    // const resizingTextareas = [].slice.call(document.querySelectorAll('textarea[autoresize]'));

    // resizingTextareas.forEach((textarea) => {
    //   textarea.addEventListener('input', this.autoresize(), false);
    // });

    // <textarea autoresize OnChange={this.handleNewAssignment} />

    // getter
    const token = this.state.tokenId;
    console.log(sessionStorage.getItem('tokenId'));
    console.log('state tokenId:', token);
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }

    return (
      <div className="EditLoan">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Add Assignment</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Add Assignment</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              <legend>Confirm Client Email Before Editing: {this.state.clientEmail} </legend>
              <br />
              <br />
              New Assignment Phase:
              <select onChange={this.handleDropDownPhase}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <br />
              New Assignment:
              <br />
              <br />
              <input type="text" name="text" onChange={this.handleNewAssignment} />
              <br />
              <br />
              <button onClick={this.submitNewAssignment}>Submit</button>
            </fieldset>
          </form>
          Assignments:
          {this.MapAssignments()}
          <br />
        </div>
      </div>
    );
  }
}

export default AddAssignment;
