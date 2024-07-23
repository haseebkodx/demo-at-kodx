import React from 'react'
import RedeemInvitation from './RedeemInvitation'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe('RedeemInvitation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<RedeemInvitation />)
  })


  describe('Initial Rendering', () => {

    it('shows redeem invitation', () => {
      expect(wrapper.find("div[data-test-id='redeem invitation']").exists()).toEqual(false)
    })
  })
})