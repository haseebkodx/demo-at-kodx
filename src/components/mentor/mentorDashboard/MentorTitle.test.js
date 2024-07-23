import React from 'react'
import MentorTitle from './MentorTitle'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('MentorTitle', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<MentorTitle />)
  })

  describe('Initial Rendering', () => {

    it('shows Mentor Title', () => {
      expect(wrapper.find("div[data-test-id='Mentor Title']").exists()).toEqual(true)
    }
    )

  })
})