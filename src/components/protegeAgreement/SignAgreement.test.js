import React from 'react'
import SignAgreement from './SignAgreement'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('SignAgreement', () => {
    let wrapper
  
    beforeEach(() => {
      wrapper = shallow(<SignAgreement />)
    })
  
    describe('Initial Rendering', () => {
  
    it('shows Sign Agreement', () => {
        expect(wrapper.find("div[data-test-id='Sign Agreement']").exists()).toEqual(true)
      })
    })
    
    it('shows sign protege name', () => {
      expect(wrapper.find("div[data-test-id='Name']").exists()).toEqual(true)
    })

    it('shows sign protege title', () => {
      expect(wrapper.find("div[data-test-id='Title']").exists()).toEqual(true)
    })

    it('shows sign protege date', () => {
      expect(wrapper.find("div[data-test-id='Date']").exists()).toEqual(true)
    })
  
  })