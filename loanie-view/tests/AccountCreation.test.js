
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import AccountCreation from '../src/Component/AccountCreation';


configure({ adapter: new Adapter() });
const wrapper = shallow(<AccountCreation />);

describe('<AccountCreation />', () => {
  //  it('should have the correct class name', () => {
  //    expect(wrapper.hasClass('AccountCreation')).equal(true);
  //  });
  it('should have one header', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
  it('should have two buttons in the webpage', () => {
    expect(wrapper.find('button')).to.have.length(2);
  });
  it('should have a Navbar in the webpage', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
});
