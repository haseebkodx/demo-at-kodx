import React from 'react'
import DevelopmentAssistance from './DevelopmentAssistance'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DevelopmentAssistance', () => {
    let wrapper 
   
   beforeEach(() => {
    wrapper = shallow(<DevelopmentAssistance />)
  })

  describe('Initial Rendering', () => {
    
    it('shows Certified Small Business', () => {
        expect(wrapper.find("div[data-test-id='Certified Small Business']").exists()).toEqual(true)
      })
    })
})