import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap';
import base from './base';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditPhase extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      phase: '',
      loanId: '',
      phaseId: '',
      phaseNo: '',
      description: '',
      title: '',
      loanType: '',
    };
  }

  componentWillMount() {
    const params = window.location.href;
    const phaseId = params.substring(params.lastIndexOf('/') + 1, params.lastIndexOf('-'));
    const loanId = params.substring(params.lastIndexOf('-') + 1, params.lastIndexOf('+'));
    axios
      .get(`${base}/loan/${loanId}`)
      .then((res) => {
        const loans = res.data.loanType;
        const phase = res.data.phases.filter(assign => assign._id === phaseId);
        this.setState({
          phase,
        });
        this.initState(loanId, phaseId, loans);
      })
      .catch((err) => {
        throw err;
      });
  }

  initState(loanId, phaseId, loanType) {
    this.setState({
      loanType,
      loanId,
      phaseId,
      title: this.state.phase[0].title,
      description: this.state.phase[0].description,
      phaseNo: this.state.phase[0].phaseNo,
    });
  }

  handleDropDownComplete = (e) => {
    this.setState({ complete: e.target.value });
  };

  handleDropDownPhaseNo = (e) => {
    this.setState({ phaseNo: e.target.value });
  };

  handleNewPhase = (e) => {
    this.setState({ text: e.target.value });
  };

  submitDeletePhase = () => {
    const body = {
      loanId: this.state.loanId,
      phaseId: this.state.phaseId,
    };
    axios
      .post(`${base}/phasedelete`, body)
      .then(() => {
        console.log('Phase deleted successfully!');
      })
      .catch((err) => {
        throw err;
      });
    const str = '/add_phase/';
    const url = str + this.state.loanId;
    window.location = url;
  };

  submitEditedPhase = () => {
    const body = {
      loanId: this.state.loanId,
      phaseId: this.state.phaseId,
      title: this.state.title,
      description: this.state.description,
    };
    axios
      .post(`${base}/phaseedit`, body)
      .then(() => {
        console.log('Phase edited successfully!');
      })
      .catch((err) => {
        throw err;
      });
    const str = '/add_phase/';
    const url = str + this.state.loanId;
    window.location = url;
  };

  render() {
    // getter
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }

    return (
      <div className="EditPhase">
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
            <BreadcrumbItem active>Edit Phase</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Phase</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              Edit Phase Number:
              {this.phaseNoDropDown()}
              <br />
              <br />
              Edit Complete Status:
              <select value={this.state.complete} onChange={this.handleDropDownComplete}>
                <option value="true">Complete</option>
                <option value="false">Incomplete</option>
              </select>
              <br />
              <br />
              Edit Phase:{' '}
              <Input
                type="textarea"
                name="text"
                value={this.state.text}
                onChange={this.handleNewPhase}
              />
              <br />
            </fieldset>
          </form>
          <Button color="warning" onClick={this.submitEditedPhase}>
            Submit Changes
          </Button>{' '}
          <Button color="danger" onClick={this.submitDeletePhase}>
            Delete Phase
          </Button>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default EditPhase;
