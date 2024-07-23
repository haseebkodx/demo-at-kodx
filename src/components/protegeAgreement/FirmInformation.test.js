import React from 'react'
import FirmInformation from './FirmInformation'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe('FirmInformation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<FirmInformation />)
  })


  describe('Initial Rendering', () => {




    it('shows Year Established', () => {
      expect(wrapper.find("div[data-test-id='Year Established']").exists()).toEqual(true)
    })
    it('shows Number of Employees', () => {
      expect(wrapper.find("div[data-test-id='Number of Employees']").exists()).toEqual(true)
    })
    it('shows Annual Gross Revenue', () => {
      expect(wrapper.find("div[data-test-id='Annual Gross Revenue']").exists()).toEqual(true)
    })

    it('shows NAICS codes', () => {
      expect(wrapper.find("div[data-test-id='NAICS codes']").exists()).toEqual(true)
    })


  })
})