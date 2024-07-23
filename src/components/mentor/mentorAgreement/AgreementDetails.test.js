import React from 'react'
import AgreementDetails from './AgreementDetails'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('AgreementDetails', () => {


    let wrapper

    beforeEach(() => {
        wrapper = shallow(<AgreementDetails />)
    })

    describe('Initial Rendering', () => {

        it('shows agreement_type', () => {
            expect(wrapper.find("p[data-test-id='agreement_type']").exists()).toEqual(true)
        })


        it('shows agreement_contact', () => {
            expect(wrapper.find("div[data-test-id='agreement_contact']").exists()).toEqual(true)
        })


        it('shows solicitation_title', () => {
            expect(wrapper.find("div[data-test-id='solicitation_title']").exists()).toEqual(true)
        })
    })

})
