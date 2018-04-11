import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Navbar from './Navbar';

export default class MyLoans extends Component {
	render() {
		return (
	    <div className="MyLoans">
	      <div className="BreadCrumb">
	        <Breadcrumb>
	          <BreadcrumbItem tag="a" href="/">
	            Home
	          </BreadcrumbItem>
	          {' > '}
	          <BreadcrumbItem active>Loans</BreadcrumbItem>
	        </Breadcrumb>
	      </div>
	      <Navbar />
	    </div>
	  );
	}
}