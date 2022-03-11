import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, Header, Content, Item, MenuHeader, HeaderButton } from './Components'

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
describe('<Item />', () => {
    it('renders correctly', () => {
        expect(shallow(<Item />)).toMatchSnapshot()
    })
})
describe('<MenuHeader />', () => {
    it('renders correctly', () => {
        expect(shallow(<MenuHeader />)).toMatchSnapshot()
    })
})

describe('<HeaderButton />', () => {
    it('renders correctly', () => {
        expect(shallow(<HeaderButton />)).toMatchSnapshot()
    })
})
