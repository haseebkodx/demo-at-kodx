import React from 'react'
import ProtegeInvitationCard from './ProtegeInvitationCard'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })



describe('ProtegeInvitation', () => {
  let wrapper


  beforeEach(() => {
    wrapper = shallow(<ProtegeInvitationCard />)
  })

  describe('Initial Rendering', () => {

    it('shows Protege Invitation', () => {
      expect(wrapper.find("section[data-test-id='Protege Invitation']").exists()).toEqual(true)
    })
  })
})