import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SidebarNav from '../src/Component/SidebarNav';

configure({ adapter: new Adapter() });
const wrapper = shallow(<SidebarNav />);

describe('<SidebarNav />', () => {
  it('should have four links ', () => {
    expect(wrapper.find('a')).have.length(4);
  });
});
