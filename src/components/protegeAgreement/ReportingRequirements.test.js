import React from 'react'
import ReportingRequirements from './ReportingRequirements'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('ReportingRequirements', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ReportingRequirements />)
  })

  describe('Initial Rendering', () => {

    it('shows Reporting Requirments', () => {
      expect(wrapper.find("div[data-test-id='Reporting Requirments']").exists()).toEqual(true)
    })
  })

})