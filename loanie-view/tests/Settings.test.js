import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Settings from '../src/Component/Settings';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Settings />);

describe('<Settings />', () => {
  it('should have a class name with name Settings', () => {
    expect(wrapper.hasClass('Settings')).to.equal(true);
  });
  it('should contain a form', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });
  it('should contain a navbar', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
  it('should contain a navbar on the side for navigation', () => {
    expect(wrapper.find('SidebarNav')).to.have.length(1);
  });
  it('form should contain 4 items or 4 headers', () => {
    expect(wrapper.find('h4')).to.have.length(4);
  });
  it('form should contain 4 buttons which allow edits of each item', () => {
    expect(wrapper.find('button')).to.have.length(4);
  });
});
