import React from 'react'
import Certifications from './Certifications'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('FirmInformation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Certifications />)
  })

  describe('Initial Rendering', () => {

    it('shows Certified Small Business', () => {
      expect(wrapper.find("div[data-test-id='Certified Small Business']").exists()).toEqual(true)
    })
  })

  // describe('when select yes for protegefirm previously participated', () => {
  //   let protegeAgreement = {
  //     'certified_small_business': 'true'
  //   }
  //   beforeEach(() => {
  //     wrapper = shallow(<Certifications protegeAgreement={protegeAgreement} />)
  //   })

  // })

})