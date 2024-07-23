import React from 'react'
import ContactInformation from './ContactInformation'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('ContactInformation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<ContactInformation />)
  })

  describe('Initial Render', () => {
    it('shows Address Line 1', () => {
      expect(wrapper.find("div[data-test-id='Address Line 1']").exists()).toEqual(true)
    })
    it('shows Address Line 2', () => {
      expect(wrapper.find("div[data-test-id='Address Line 2']").exists()).toEqual(true)
    })
    it('shows City', () => {
      expect(wrapper.find("div[data-test-id='City']").exists()).toEqual(true)
    })
    it('shows State', () => {
      expect(wrapper.find("div[data-test-id='State']").exists()).toEqual(true)
    })
    it('shows Zip', () => {
      expect(wrapper.find("div[data-test-id='Zip']").exists()).toEqual(true)
    })
  })
})
