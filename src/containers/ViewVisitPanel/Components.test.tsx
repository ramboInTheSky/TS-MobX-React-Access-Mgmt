import React from 'react'
import { shallow } from 'enzyme'

import {
    Wrapper,
    Title,
    DateContainer,
    ButtonsContainer,
    ArchetypesContainer,
    TagsContainer,
    ActionsBar,
    RoomsContainer,
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

describe('<TagsContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<TagsContainer />)).toMatchSnapshot()
    })
})

describe('<RoomsContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<RoomsContainer />)).toMatchSnapshot()
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

describe('<ActionsBar />', () => {
    it('renders correctly', () => {
        expect(shallow(<ActionsBar />)).toMatchSnapshot()
    })
})

describe('<ButtonsContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<ButtonsContainer />)).toMatchSnapshot()
    })
})
