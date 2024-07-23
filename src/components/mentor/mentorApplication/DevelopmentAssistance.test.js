import React from 'react'
import DevelopmentAssistance from './DevelopmentAssistance'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('CompanyInformation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<DevelopmentAssistance />)
  })

  describe('Initial Rendering', () => {

    it('shows Develop Assist', () => {
      expect(wrapper.find("div[data-test-id='Develop Assist']").exists()).toEqual(true)
    })

  })
})