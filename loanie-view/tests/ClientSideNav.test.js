import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ClientSideNav from '../src/Component/ClientSideNav';

configure({ adapter: new Adapter() });
const wrapper = shallow(<ClientSideNav />);

describe('<ClientSideNav />', () => {
  it('should have two links ', () => {
    expect(wrapper.find('a')).have.length(2);
  });
});
