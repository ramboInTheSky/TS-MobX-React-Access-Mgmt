import React from 'react'
import { shallow } from 'enzyme'

import { CardContainer } from './CardContainer'

describe('<CardContainer />', () => {
    let props: any
    // const Component = (CardContainer as any).wrappedComponent
    beforeEach(() => {
        props = {
            removeFn: jest.fn(),
            type: 'rooms',
            items: [
                {
                    id: '111-123-123-123',
                    name: '1.11',
                    type: 'room 11',
                    notes: 'this is just a room',
                },
                {
                    id: '222-123-123-123',
                    name: '1.12',
                    type: 'room 12',
                    notes: 'this is the best room',
                },
            ],
        }
    })
    it('renders correctly with rooms', () => {
        expect(shallow(<CardContainer {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with tags', () => {
        const newProps = {
            ...props,
            type: 'tags',
            items: ['123123123', '234234234'],
        }
        expect(shallow(<CardContainer {...props} />)).toMatchSnapshot()
    })
})
