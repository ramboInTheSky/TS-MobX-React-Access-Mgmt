import React from 'react'
import { shallow } from 'enzyme'

import {
    Wrapper,
    Field,
    FieldsContainer,
    ActionsBar,
    Name,
    ButtonsContainer,
    SingleColumnFieldSet,
    InputContainer,
    Input,
    TwoColumnsFieldset,
    NotesInputContainer,
} from './Components'

describe('<Wrapper />', () => {
    it('renders correctly', () => {
        expect(shallow(<Wrapper />)).toMatchSnapshot()
    })
})

describe('<Field />', () => {
    it('renders correctly', () => {
        expect(shallow(<Field />)).toMatchSnapshot()
    })
})

describe('<FieldsContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<FieldsContainer />)).toMatchSnapshot()
    })
})

describe('<ActionsBar />', () => {
    it('renders correctly', () => {
        expect(shallow(<ActionsBar />)).toMatchSnapshot()
    })
})

describe('<Name />', () => {
    it('renders correctly', () => {
        expect(shallow(<Name />)).toMatchSnapshot()
    })
})

describe('<ButtonsContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<ButtonsContainer />)).toMatchSnapshot()
    })
})

describe('<SingleColumnFieldSet />', () => {
    it('renders correctly', () => {
        expect(shallow(<SingleColumnFieldSet />)).toMatchSnapshot()
    })
})

describe('<InputContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<InputContainer />)).toMatchSnapshot()
    })
})

describe('<Input />', () => {
    it('renders correctly', () => {
        expect(shallow(<Input />)).toMatchSnapshot()
    })
})

describe('<TwoColumnsFieldset />', () => {
    it('renders correctly', () => {
        expect(shallow(<TwoColumnsFieldset />)).toMatchSnapshot()
    })
})

describe('<NotesInputContainer />', () => {
    it('renders correctly', () => {
        expect(shallow(<NotesInputContainer />)).toMatchSnapshot()
    })
})
