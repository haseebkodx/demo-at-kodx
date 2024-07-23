import React from 'react'
import AccountInformation from './AccountInformation'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('AccountInformation', () => {
  let wrapper
  const userInfo = {
    email: 'abc@abc.com'
  }


  beforeEach(() => {
    wrapper = shallow(<AccountInformation userInfo={userInfo} />)
  })

  describe('Initial Render', () => {
    it('shows User Email', () => {
      expect(wrapper.find("div[data-test-id='User Email']").exists()).toEqual(true)
    })
    it('shows First Name', () => {
      expect(wrapper.find("div[data-test-id='First Name']").exists()).toEqual(true)
    })
    it('shows Last Name', () => {
      expect(wrapper.find("div[data-test-id='Last Name']").exists()).toEqual(true)
    })
  })
})

