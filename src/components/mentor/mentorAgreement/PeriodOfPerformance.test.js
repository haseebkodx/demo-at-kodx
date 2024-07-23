import React from "react"
import PeriodOfPerformance from './PeriodOfPerformance'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux'


Enzyme.configure({ adapter: new Adapter() })

describe('PeriodOfPerformance', () => {


    let wrapper

    beforeEach(() => {


        const spy = jest.spyOn(redux, 'useDispatch')
        spy.mockReturnValue({})
        wrapper = shallow(<PeriodOfPerformance />)
    })

    describe('Initial Rendering', () => {


        it('shows start_date', () => {
            expect(wrapper.find("div[data-test-id='start_date']").exists()).toEqual(true)
        })
    })

})
