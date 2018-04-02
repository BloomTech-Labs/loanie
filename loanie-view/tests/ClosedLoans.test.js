import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ClosedLoans from '../src/Component/ClosedLoans';

configure({ adapter: new Adapter() });
const wrapper = shallow(<ClosedLoans />);

describe('<ClosedLoans', () => {
  it('should have a header', () => {
    expect(wrapper.find('h1')).have.length(1);
  });
  it('should contain a navbar', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
  it('should contain a navbar on the side for navigation', () => {
    expect(wrapper.find('SidebarNav')).to.have.length(1);
  });
});
