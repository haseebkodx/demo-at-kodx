import React from 'react'
import Security from './Security'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('Security', () => {
  describe('Initial Render', () => {
    let wrapper
    const userInfo = { sign_in_count: '2' }


    beforeEach(() => {
      wrapper = shallow(<Security userInfo={userInfo} />)
    })

    it('shows Security Info', () => {
      expect(wrapper.find("div[data-test-id='Security Info']").exists()).toEqual(true)
    })
  })
})
