import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, Header, Content, CloseButton, LockGroup } from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})
describe('<Header />', () => {
    it('renders correctly', () => {
        expect(shallow(<Header />)).toMatchSnapshot()
    })
})

describe('<Content />', () => {
    it('renders correctly', () => {
        expect(shallow(<Content />)).toMatchSnapshot()
    })
})

describe('<CloseButton />', () => {
    it('renders correctly', () => {
        expect(shallow(<CloseButton />)).toMatchSnapshot()
    })
})

describe('<LockGroup />', () => {
    it('renders correctly', () => {
        expect(shallow(<LockGroup />)).toMatchSnapshot()
    })
})
