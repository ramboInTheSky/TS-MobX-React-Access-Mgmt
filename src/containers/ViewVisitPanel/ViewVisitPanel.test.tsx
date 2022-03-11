import React from 'react'
import { shallow } from 'enzyme'
import { mockDateConstructor, ProfilesMock } from '../../stores/mock'

import { ViewVisitPanel } from '.'
import { VisitsMock, RoutingMock } from '../../stores/mock'

mockDateConstructor()

describe('<ViewVisitPanel />', () => {
    let props: any
    beforeEach(() => {
        props = {
            match: {
                params: {
                    profileId: '123',
                },
            },
            profiles: new ProfilesMock(),
            routing: new RoutingMock(),
            visits: new VisitsMock(),
        }
    })

    it('renders correctly', () => {
        expect(shallow(<ViewVisitPanel {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with tags, rooms and archetypes', () => {
        const newProps = {
            ...props,
            visits: {
                ...props.visits,
                detail: {
                    archetype_ids: ['111-111-111'],
                    from_date: '2019-05-20T13:31:08.202Z',
                    id: '7439672c-190e-4b17-9c8e-48ab1bc8922f',
                    tag_numbers: ['123123123', '234234234'],
                    to_date: null,
                    lockGroups: [
                        {
                            id: 'ae46555c-309b-4251-8923-84e0ae5410a0',
                            name: 'Back door',
                            notes: null,
                            saltoLockIds: [],
                            type: 'Other',
                        },
                    ],
                },
            },
        }
        expect(shallow(<ViewVisitPanel {...newProps} />)).toMatchSnapshot()
    })
})
