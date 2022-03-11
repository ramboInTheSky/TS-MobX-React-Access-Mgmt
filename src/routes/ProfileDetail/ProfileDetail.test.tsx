import React from 'react'
import { shallow } from 'enzyme'

import { ProfileDetail } from '.'
import { ProfilesMock, RoutingMock, NotificationMock } from '../../stores/mock'
import { VisitsMock } from '../../stores/mock/VisitsMock'
import { Profile } from '../../models/Profile'

describe('<ProfileDetail />', () => {
    let props: any
    const Component = (ProfileDetail as any).wrappedComponent
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
            notifications: new NotificationMock(),
        }
    })

    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly when NEW Profile', () => {
        const match = {
            params: {
                profileId: 'new',
            },
        }
        expect(
            shallow(<Component {...props} match={match} />)
        ).toMatchSnapshot()
        expect(props.profiles.toggleEditing).toHaveBeenCalled()
    })

    it('calls the api correctly', () => {
        shallow(<Component {...props} />)
        expect(props.profiles.getDetail).toHaveBeenCalled()
    })

    it('calls the right apis on Save', () => {
        const el = shallow(<Component {...props} />)
				const instance = (el.instance() as any)
				instance.save(new Profile())
        expect(props.profiles.save).toHaveBeenCalled()
    })

    it('renders correctly when data is loading', () => {
        const el = shallow(
            <Component
                {...props}
                profiles={{ ...props.profiles, loading: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    it('renders correctly when on edit mode', () => {
        props.profiles.editing = true
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })

    it('renders correctly when on create mode', () => {
        props.match.params.profileId = 'new'
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })

    it('handles API errors', () => {
        const el = shallow(
            <Component
                {...props}
                profiles={{ ...props.profiles, isError: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    it('renders correctly with data', () => {
        const detail = {
            profileId: 'wert34-324c523-2c356-c34c523-4c23456v23',
            firstName: 'Bruce',
            lastName: 'Wayne',
            company: 'Wayne Enterprises',
            mobileNumber: '555-123-123',
            emailAddress: 'info@waine-enterprises.com',
            notes: 'Gotham is safe',
            created: '2014-03-25T12:00:00Z',
            type: 'member',
            lockGroupNames: ['Default', 'Boiler', '1.11'],
            visits: [
                {
                    id: 'q3w4c5-w34cr-w34cw34-5cw3-4cw345-3cw34t',
                    from: '2015-03-25T12:00:00Z',
                    to: '2015-03-25T12:00:00Z',
                    tags: ['123123', '234234', '345345'],
                },
                {
                    id: 'vvv4c5-w34cr-w34cw34-5cbb-4cw345-3cw311',
                    from: '20190401T10:00:10.000Z',
                    to: '20190501T10:00:10.000Z',
                    tags: ['123123', '234234', '345345'],
                },
            ],
        }

        const el = shallow(
            <Component {...props} profiles={{ ...props.profiles, detail }} />
        )
        expect(el).toMatchSnapshot()
    })
})
