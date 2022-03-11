import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { RoutingMock, ProfilesMock, NotificationMock } from '../../stores/mock'
configure({ adapter: new Adapter() })

import { Profiles } from '.'

describe('<Profiles />', () => {
    let props: any
    const Component = (Profiles as any).wrappedComponent
    beforeEach(() => {
        props = {
            profiles: new ProfilesMock(),
            routing: new RoutingMock(),
            notifications: new NotificationMock(),
        }
    })
    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with data', () => {
        const profiles = new ProfilesMock().data
        expect(
            shallow(
                <Component
                    {...props}
                    profiles={{ ...props.profiles, items: profiles }}
                />
            )
        ).toMatchSnapshot()
    })

    it('calls the api correctly', () => {
        shallow(<Component {...props} />)
        expect(props.profiles.getList).toHaveBeenCalled()
    })

    it('renders correctly when data is loading', () => {
        const el = shallow(
            <Component
                {...props}
                profiles={{ ...props.profiles, isLoading: true }}
            />
        )
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
})
