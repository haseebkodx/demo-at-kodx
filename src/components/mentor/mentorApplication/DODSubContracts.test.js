import React from 'react'
import DODSubContracts from './DODSubContracts'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe('DODSubContracts', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<DODSubContracts />)
  })


  describe('Initial Rendering', () => {

    it('shows dod-sc-sdb-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-sc-sdb-prev-year']").exists()).toEqual(true)
    })

    it('shows dod-sc-sdb-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-sc-sdb-two-prev-year']").exists()).toEqual(true)
    })

  })
})