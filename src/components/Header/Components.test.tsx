import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, Logo, MenuButton, Title } from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})

describe('<Logo />', () => {
    it('renders correctly', () => {
        expect(shallow(<Logo />)).toMatchSnapshot()
    })
})

describe('<MenuButton />', () => {
    it('renders correctly', () => {
        expect(shallow(<MenuButton />)).toMatchSnapshot()
    })
})

describe('<Title />', () => {
    it('renders correctly', () => {
        expect(shallow(<Title />)).toMatchSnapshot()
    })
})
