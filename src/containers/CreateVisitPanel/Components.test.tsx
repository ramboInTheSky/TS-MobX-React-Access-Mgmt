import React from 'react'
import { shallow } from 'enzyme'

import {
    Wrapper,
    Title,
    PickersContainer,
    DateContainer,
    ArchetypesContainer,
} from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})

describe('<Title />', () => {
    it('renders correctly', () => {
        expect(shallow(<Title />)).toMatchSnapshot()
    })
})

describe('<PickersContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<PickersContainer />)).toMatchSnapshot()
    })
})

describe('<DateContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<DateContainer />)).toMatchSnapshot()
    })
})

describe('<ArchetypesContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<ArchetypesContainer />)).toMatchSnapshot()
    })
})
