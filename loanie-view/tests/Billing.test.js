import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Billing from '../src/Component/Billing';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Billing />);

describe('<Billing />', () => {
  it('should contain a navbar', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
});
