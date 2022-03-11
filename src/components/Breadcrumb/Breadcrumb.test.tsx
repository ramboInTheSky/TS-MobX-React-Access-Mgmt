import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Breadcrumb } from './Breadcrumb'
import { RoutingMock } from '../../stores/mock'

describe('<Breadcrumb />', () => {
    let props: any
    let el: ShallowWrapper<Breadcrumb>
    const Component = (Breadcrumb as any).wrappedComponent
    beforeEach(() => {
        props = {
            routing: new RoutingMock(),
        }
        el = shallow(<Component {...props} />)
    })

    it('renders correctly', () => {
        expect(el).toMatchSnapshot()
    })

    it('calls the api on mount', () => {
        expect(props.routing.resizeBreadcrumb).toHaveBeenCalled()
    })
})
