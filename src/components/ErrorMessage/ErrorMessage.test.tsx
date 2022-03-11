import React from 'react'
import { shallow } from 'enzyme'

import { ErrorMessage, ErrorMessageProps } from './ErrorMessage'
import { RoutingMock } from '../../stores/mock'

describe('<ErrorMessage />', () => {
    let props: any
    const Component = (ErrorMessage as any).wrappedComponent
    beforeEach(() => {
        props = {
            routing: new RoutingMock(),
        }
    })
    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    // it('passes on props correctly', () => {
    // 	expect(shallow(<ErrorMessage foo="bar">Hello</ErrorMessage>)).toMatchSnapshot()
    // })

    // it('Does not re-render on children props change', () => {
    // 	const el: any = shallow(<ErrorMessage foo="bar" />)
    // 	el.setProps({ children: 'Goodbye' })
    // 	el.update()
    // 	expect(el).toMatchSnapshot()
    // })
})
