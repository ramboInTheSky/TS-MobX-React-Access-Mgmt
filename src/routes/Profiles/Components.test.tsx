import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import {
    ActionBar,
    SearchWrapper,
    Action,
    Title,
    ActionIcon,
} from './Components'

describe('<ActionBar />', () => {
    it('renders correctly', () => {
        expect(shallow(<ActionBar />)).toMatchSnapshot()
    })
})

describe('<SearchWrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<SearchWrapper />)).toMatchSnapshot()
    })
})

describe('<Action />', () => {
    it('renders correctly', () => {
        expect(shallow(<Action />)).toMatchSnapshot()
    })
})

describe('<Title />', () => {
    it('renders correctly', () => {
        expect(shallow(<Title />)).toMatchSnapshot()
    })
})

describe('<ActionIcon />', () => {
    it('renders correctly', () => {
        expect(shallow(<ActionIcon />)).toMatchSnapshot()
    })
})
