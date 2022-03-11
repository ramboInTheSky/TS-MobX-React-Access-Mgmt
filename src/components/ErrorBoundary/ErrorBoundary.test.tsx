import React from 'react'
import { shallow } from 'enzyme'
import { Boundary } from './ErrorBoundary'

describe('<Boundary />', () => {
    it('renders correctly', () => {
        expect(shallow(<Boundary />)).toMatchSnapshot()
    })

    // it('passes on props correctly', () => {
    // 	expect(shallow(<Boundary foo="bar">Hello</Boundary>)).toMatchSnapshot()
    // })

    // it('Does not re-render on children props change', () => {
    // 	const el: any = shallow(<Boundary foo="bar" />)
    // 	el.setProps({ children: 'Goodbye' })
    // 	el.update()
    // 	expect(el).toMatchSnapshot()
    // })
})
