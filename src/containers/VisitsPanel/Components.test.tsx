import React from 'react'
import { shallow } from 'enzyme'

import {
    Wrapper,
    Entry,
    AccessContainer,
    DatesContainer,
    Access,
    Status,
    Divider,
} from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})

describe('<Entry />', () => {
    it('renders correctly', () => {
        expect(shallow(<Entry />)).toMatchSnapshot()
    })
})

describe('<AccessContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<AccessContainer />)).toMatchSnapshot()
    })
})

describe('<DatesContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<DatesContainer />)).toMatchSnapshot()
    })
})

describe('<Access />', () => {
    it('renders correctly', () => {
        expect(shallow(<Access />)).toMatchSnapshot()
    })
})

describe('<Status />', () => {
    it('renders correctly', () => {
        expect(shallow(<Status />)).toMatchSnapshot()
    })
})

describe('<Divider />', () => {
    it('renders correctly', () => {
        expect(shallow(<Divider />)).toMatchSnapshot()
    })
})
