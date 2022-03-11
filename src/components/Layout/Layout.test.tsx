import React from 'react'
import { shallow } from 'enzyme'

import { Layout } from '.'
import { AuthMock } from '../../stores/mock'

describe('<Layout />', () => {
    let props: any
    beforeEach(() => {
        props = {
            auth: new AuthMock(),
        }
    })
    it('renders correctly', () => {
        expect(shallow(<Layout {...props} />)).toMatchSnapshot()
    })

    it('passes on props correctly', () => {
        expect(shallow(<Layout {...props} children="bar" />)).toMatchSnapshot()
    })

    it('Does not re-render on children props change', () => {
        const el: any = shallow(<Layout {...props} children="bar" />)
        el.setProps({ children: 'Goodbye' })
        el.update()
        expect(el).toMatchSnapshot()
    })
})
