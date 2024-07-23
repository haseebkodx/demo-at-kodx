import React from 'react'
import MentorAccountInfo from './MentorAccountInfo'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('MentorAccountInfo', () => {
  let wrapper
  const userInfo = { last_sign_in_at: '2pm', last_sign_in_ip: '1:1:1:1' }


  beforeEach(() => {
    wrapper = shallow(<MentorAccountInfo userInfo={userInfo} />)
  })

  describe('Initial Rendering', () => {

    it('shows Account information', () => {
      expect(wrapper.find("div[data-test-id='Account information']").exists()).toEqual(true)
    })
  })
})