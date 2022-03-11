import React from 'react'
import { shallow } from 'enzyme'

import { Container, Input, Action } from './Components'

describe('<Container />', () => {
    it('renders correctly', () => {
        expect(shallow(<Container />)).toMatchSnapshot()
    })
})

describe('<Input />', () => {
    it('renders correctly', () => {
        expect(shallow(<Input />)).toMatchSnapshot()
    })
})

describe('<Action />', () => {
    it('renders correctly', () => {
        expect(shallow(<Action />)).toMatchSnapshot()
    })
})
