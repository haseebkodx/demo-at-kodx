import React from 'react'
import HistoricalBackground from './HistoricalBackground'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('HistoricalBackground', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<HistoricalBackground />)
  })


  describe('Initial Rendering', () => {

    it('shows Historical Background', () => {
      expect(wrapper.find("div[data-test-id='Historical Background']").exists()).toEqual(true)
    })

    it('shows Historical Background File', () => {
      expect(wrapper.find("div[data-test-id='Historical Background File']").exists()).toEqual(true)
    })

  })
})