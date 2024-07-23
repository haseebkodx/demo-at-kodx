import React from 'react'
import Eligibility from './Eligibility'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('CompanyInformation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<Eligibility />)
  })


  describe('Initial Rendering', () => {

    it('shows Current Plan', () => {
      expect(wrapper.find("div[data-test-id='Current Plan']").exists()).toEqual(true)
    })

    it('shows Current Eligible Award', () => {
      expect(wrapper.find("div[data-test-id='Current Eligible Award']").exists()).toEqual(true)
    })

  })
})