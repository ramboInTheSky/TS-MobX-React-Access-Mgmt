import React from 'react'
import { shallow } from 'enzyme'

import { ArchetypeCard } from './ArchetypeCard'

describe('<ArchetypeCard />', () => {
    let props: any
    beforeEach(() => {
        props = {}
    })
    it('renders correctly', () => {
        expect(shallow(<ArchetypeCard {...props} />)).toMatchSnapshot()
    })

    // it('passes on props correctly', () => {
    // 	expect(shallow(<ArchetypeCard foo="bar">Hello</ArchetypeCard>)).toMatchSnapshot()
    // })

    // it('Does not re-render on children props change', () => {
    // 	const el: any = shallow(<ArchetypeCard foo="bar" />)
    // 	el.setProps({ children: 'Goodbye' })
    // 	el.update()
    // 	expect(el).toMatchSnapshot()
    // })
})
