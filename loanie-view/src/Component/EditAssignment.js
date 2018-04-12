import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditAssignment extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      assignment: '',
      loanId: '',
      assignmentId: '',
      phase: '',
      text: '',
      complete: '',
    };
  }

  componentDidMount() {
    const params = window.location.href;
    const assignmentId = params.substring(params.lastIndexOf('/') + 1, params.lastIndexOf('-'));
    const loanId = params.substring(params.lastIndexOf('-') + 1, params.lastIndexOf('+'));
    console.log('loanId', loanId);
    console.log('assignmentId', assignmentId);
    axios
      .get(`http://localhost:3030/loan/${loanId}`)
      .then((res) => {
        const assignment = res.data.assignments.filter(assign => assign._id === assignmentId);
        this.setState({
          assignment,
        });
        this.initState(loanId, assignmentId);
        console.log('assignment', assignment);
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch loan data.', err);
      });
  }

  initState(loanId, assignmentId) {
    console.log('state assignment', this.state.assignment);
    this.setState({
      loanId,
      assignmentId,
      complete: this.state.assignment[0].complete,
      text: this.state.assignment[0].text,
      phase: this.state.assignment[0].phase,
    });
    console.log('state', this.state);
  }

  handleDropDownComplete = (e) => {
    console.log(e.target.value);
    this.setState({ complete: e.target.value });
  };

  handleDropDownPhase = (e) => {
    console.log(e.target.value);
    this.setState({ phase: e.target.value });
  };

  handleNewAssignment = (e) => {
    this.setState({ text: e.target.value });
    console.log(this.state.newAssignmentText);
  };

  submitDeleteAssignment = () => {
    console.log('delete assignment');
    console.log('state', this.state);
    const body = {
      loanId: this.state.loanId,
      assignmentId: this.state.assignmentId,
    };
    axios
      .post('http://localhost:3030/assignmentdelete', body)
      .then(() => {
        console.log('Assignment deleted successfully!');
      })
      .catch((err) => {
        console.log('Assignment deletion failed.', err);
      });
    const str = '/add_assignment/';
    const url = str + this.state.loanId;
    window.location = url;
  };

  submitEditedAssignment = () => {
    console.log('edit assignment');
    console.log('state', this.state);
    const body = {
      loanId: this.state.loanId,
      assignmentId: this.state.assignmentId,
      text: this.state.text,
      phase: this.state.phase,
      complete: this.state.complete,
    };
    axios
      .post('http://localhost:3030/assignmentedit', body)
      .then(() => {
        console.log('Assignment edited successfully!');
      })
      .catch((err) => {
        console.log('Assingment editing failed.', err);
      });
    const str = '/add_assignment/';
    const url = str + this.state.loanId;
    window.location = url;
  };

  render() {
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
      <div className="EditAssignment">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/loan_list">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href={`/edit_loan/${this.state.loanId}`}>
              Edit Loan
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit Assignment</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Assignment</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              Edit Phase:
              <select value={this.state.phase} onChange={this.handleDropDownPhase}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <br />
              Edit Complete Status:
              <select value={this.state.complete} onChange={this.handleDropDownComplete}>
                <option value="true">Complete</option>
                <option value="false">Incomplete</option>
              </select>
              <br />
              <br />
              Edit Assignment:{' '}
              <input
                type="text"
                value={this.state.text}
                name="edit"
                onChange={this.handleNewAssignment}
              />
              <br />
            </fieldset>
          </form>
          <Button color="warning" onClick={this.submitEditedAssignment}>
            Submit Changes
          </Button>{' '}
          <Button color="danger" onClick={this.submitDeleteAssignment}>
            Delete Assignment
          </Button>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default EditAssignment;
