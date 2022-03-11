import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, Heading, Content } from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})

describe('<Heading />', () => {
    it('renders correctly', () => {
        expect(shallow(<Heading />)).toMatchSnapshot()
    })
})

describe('<Content />', () => {
    it('renders correctly', () => {
        expect(shallow(<Content />)).toMatchSnapshot()
    })
})
