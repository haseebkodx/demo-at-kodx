import React from 'react'
import TermsAndCondtions from './TermsAndConditions'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('TermsAndCondtions', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<TermsAndCondtions />)
  })


  describe('Initial Rendering', () => {

    it('shows Current Plan', () => {
      expect(wrapper.find("div[data-test-id='TermsAndCondtions']").exists()).toEqual(true)
    })
  })
})