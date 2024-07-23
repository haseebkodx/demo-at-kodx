import React from 'react'
import TroubleSupport from './TroubleSupport'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('AccountInformation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<TroubleSupport />)
  })

  describe('Initial Render', () => {
    it('shows Trouble Support Info', () => {
      expect(wrapper.find("div[data-test-id='Trouble Support Info']").exists()).toEqual(true)
    })
  })
})
