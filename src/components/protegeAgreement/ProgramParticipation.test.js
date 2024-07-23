import React from 'react'
import ProgramParticipation from './ProgramParticipation'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('FirmInformation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ProgramParticipation />)
  })

  describe('Initial Rendering', () => {

    it('shows Protege Firm Participated', () => {
      expect(wrapper.find("div[data-test-id='Protege Firm Participated']").exists()).toEqual(true)
    })
  })

  describe('when select yes for protegefirm previously participated', () => {
    let protegeAgreement = {
      'protege_firm_participated': 'true'
    }
    beforeEach(() => {
      wrapper = shallow(<ProgramParticipation protegeAgreement={protegeAgreement} />)
    })


    it('shows Period of performance of previous agreement', () => {
      expect(wrapper.find("div[data-test-id='Period of performance of previous agreement']").exists()).toEqual(true)
    })

    it('shows Termination Date', () => {
      expect(wrapper.find("div[data-test-id='Termination Date']").exists()).toEqual(true)
    })
    it('shows Termination Reason', () => {
      expect(wrapper.find("div[data-test-id='Termination Reason']").exists()).toEqual(true)
    })

  })

})