import React from 'react'
import { shallow } from 'enzyme'

import { ProtectedRoute } from '.'
import { AuthMock, RoutingMock } from '../../stores/mock'

describe('<ProtectedRoute />', () => {
    let props: any
    beforeEach(() => {
        props = {
            component: jest.fn(),
            redirectTo: 'a-route',
            auth: new AuthMock(),
            routing: new RoutingMock(),
        }
    })
    it('renders correctly with a user', () => {
        expect(shallow(<ProtectedRoute {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with no user', () => {
        const newProps = { ...props, auth: { ...props.auth, user: null } }
        const el = shallow(<ProtectedRoute {...newProps} />)
        expect(el).toMatchSnapshot()
    })

    it('redirects correctly', () => {
        shallow(<ProtectedRoute {...props} />)
        expect(props.routing.goToPage).not.toHaveBeenCalled()
    })
})
