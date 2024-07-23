import React from 'react'
import DODContracts from './DODContracts'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DODContracts', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<DODContracts />)
  })


  describe('Initial Rendering', () => {

    it('shows dod-pc-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-pc-prev-year']").exists()).toEqual(true)
    })

    it('shows dod-pc-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-pc-two-prev-year']").exists()).toEqual(true)
    })

    it('shows dod-sc-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-sc-prev-year']").exists()).toEqual(true)
    })

    it('shows dod-sc-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='dod-sc-two-prev-year']").exists()).toEqual(true)
    })

    it('shows fa-pc-prev-year', () => {
      expect(wrapper.find("div[data-test-id='fa-pc-prev-year']").exists()).toEqual(true)
    })

    it('shows fa-pc-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='fa-pc-two-prev-year']").exists()).toEqual(true)
    })

    it('shows fa-sc-prev-year', () => {
      expect(wrapper.find("div[data-test-id='fa-sc-prev-year']").exists()).toEqual(true)
    })

    it('shows fa-sc-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='fa-sc-two-prev-year']").exists()).toEqual(true)
    })

    it('shows sc-award-prev-year', () => {
      expect(wrapper.find("div[data-test-id='sc-award-prev-year']").exists()).toEqual(true)
    })

    it('shows sc-award-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='sc-award-two-prev-year']").exists()).toEqual(true)
    })

    it('shows sdb-sc-prev-year', () => {
      expect(wrapper.find("div[data-test-id='sdb-sc-prev-year']").exists()).toEqual(true)
    })

    it('shows sdb-sc-two-prev-year', () => {
      expect(wrapper.find("div[data-test-id='sdb-sc-two-prev-year']").exists()).toEqual(true)
    })

  })
})