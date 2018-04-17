import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
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
      clientEmail: '',
      assignments: [],
      loanId: '',
      loanType: '',
    };
  }

  componentWillMount() {
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    const getLoanId = window.location.href;
    const id = getLoanId.split('/').pop();
    this.setId(id);
    axios
      .get(`${base}/loan/${id}`)
      .then((res) => {
        console.log('res clientemail', res.data.clientEmail);
        this.setState({
          loanType: res.data.loanType,
          clientEmail: res.data.clientEmail,
          assignments: res.data.assignments,
        });
        console.log('Response from server: ', res);
      })
      .catch((err) => {
        console.log('Unable to fetch user data.', err);
      });
  }

  setId(id) {
    this.setState({
      loanId: id,
    });
  }

  handleNewAssignment = (event) => {
    this.setState({ newAssignmentText: event.target.value });
    console.log(this.state.newAssignmentText);
  };

  phaseDropDown() {
    console.log('current loan type');
    const type = this.state.loanType;
    if (type === 'new') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      );
    } else if (type === 'construction') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      );
    } else if (type === 'refinance') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      );
    }
    return (
      <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    );
  }

  submitNewAssignment = () => {
    const id = this.state.loanId;
    const assignment = {
      text: this.state.newAssignmentText,
      phase: this.state.assignmentPhase,
    };

    const body = {
      loanId: id,
      assignments: assignment,
    };
    console.log('body', body);
    const base = 'http://localhost:3030' || 'https://loanie.herokuapp.com';
    axios
      .post(`${base}/assignment`, body)
      .then(() => {
        console.log('Assignment created successfully!');
        window.location = `/add_assignment/${id}`;
      })
      .catch((err) => {
        console.log('Assignment creation failed.', err);
      });
  };

  MapAssignments() {
    return (
      <div className="Card-container">
        {this.state.assignments.sort((a, b) => a.phase - b.phase).map(assignment => (
          <Card className="AddAssignment-cards">
            <CardHeader>Phase: {assignment.phase}</CardHeader>
            <CardBody>
              <CardText>
                <Link to={`/edit_assignment/${assignment._id}-${this.state.loanId}+`}>
                  {assignment.text}
                </Link>
              </CardText>
            </CardBody>
          </Card>
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
      <div className="AddAssignment">
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
        <div className="AddAssignment-title-container">
          <h1>Add Assignment</h1>
        </div>
        <div className="AddAssignment-form-container">
          <form>
            <fieldset>
              <legend>Confirm Client Email Before Editing: {this.state.clientEmail} </legend>
              <br />
              <br />
              New Assignment Phase:
              {this.phaseDropDown()}
              <br />
              <br />
              New Assignment:
              <br />
              <br />
              <input type="text" name="text" onChange={this.handleNewAssignment} />
              <br />
              <br />
            </fieldset>
            <button onClick={this.submitNewAssignment}>Submit</button>
          </form>
        </div>
        <div className="Assignment-title">
          <h1>Assignments:</h1>
        </div>
        <div>{this.MapAssignments()}</div>
        <br />
      </div>
    );
  }
}

export default AddAssignment;
