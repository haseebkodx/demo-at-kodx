import React from 'react'
import Eligibility2 from './Eligibility2'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe('Eligibility2', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<Eligibility2 />)
  })


  describe('Initial Rendering', () => {

    it('shows eligibility-textarea', () => {
      expect(wrapper.find("div[data-test-id='eligibility-textarea']").exists()).toEqual(true)
    })

  })
})