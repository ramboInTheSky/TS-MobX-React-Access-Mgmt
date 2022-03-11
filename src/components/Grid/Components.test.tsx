import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper } from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})
