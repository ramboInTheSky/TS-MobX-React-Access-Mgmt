import React from 'react'
import { shallow } from 'enzyme'

import { VisitsPanel } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock'

describe('<VisitsPanel />', () => {
    let props: any
    beforeEach(() => {
        props = {
            visits: [],
            profiles: new ProfilesMock(),
            routing: new RoutingMock(),
        }
    })
    it('renders correctly with no data', () => {
        expect(shallow(<VisitsPanel {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with data', () => {
        const newProps = {
            ...props,
            visits: [
                {
                    id: 'q3w4c5-w34cr-w34cw34-5cw3-4cw345-3cw34t',
                    from: '2015-03-25T12:00:00Z',
                    to: '2015-03-25T12:00:00Z',
                    tags: ['123123', '234234', '345345'],
                    lockGroups: ['Default', 'Boiler', '1.11'],
                },
                {
                    id: 'vvv4c5-w34cr-w34cw34-5cbb-4cw345-3cw311',
                    from: '2019-04-01T10:00:10.000Z',
                    to: '2019-05-01T10:00:10.000Z',
                    tags: ['123123', '234234', '345345'],
                    lockGroups: ['Default', 'Boiler', '1.11'],
                },
            ],
        }
        expect(shallow(<VisitsPanel {...newProps as any} />)).toMatchSnapshot()
    })
})
