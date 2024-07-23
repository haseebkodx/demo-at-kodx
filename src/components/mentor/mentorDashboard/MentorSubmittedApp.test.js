import React from 'react'
import MentorSubmittedApp from './MentorSubmittedApp'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('MentorSubmittedApp', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<MentorSubmittedApp />)
  })

  describe('Initial Rendering', () => {

    it('shows Mentor Submitted app', () => {
      expect(wrapper.find("div[data-test-id='Mentor Name']").exists()).toEqual(false)
    })

  })
})