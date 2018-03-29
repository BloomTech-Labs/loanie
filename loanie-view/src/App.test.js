import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/App';


configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('should have the correct class name', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('App')).to.equal(true);
  });
  it('should have a line of text in the middle of the webpage', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('p')).to.have.length(1);
  });
  it('should have a button in the webpage', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have a Navbar in the webpage', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('NavBar')).to.have.length(1);
  });
});
