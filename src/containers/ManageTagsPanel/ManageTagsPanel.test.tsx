import React from 'react'
import { shallow } from 'enzyme'
import { ProfileStore } from '../../stores'

import { ManageTagsPanel } from '.'
import { RoutingMock, VisitsMock } from '../../stores/mock'

describe('<ManageTagsPanel />', () => {
		let props: any
		const Component = (ManageTagsPanel as any).wrappedComponent
    beforeEach(() => {
        props = {
            addTag: jest.fn(),
            profiles: new ProfileStore(),
            routing: new RoutingMock() as any,
            visits: new VisitsMock() as any,
        }
    })
    it('renders correctly with no data', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly when coming from new Visit', () => {
        props.visits.isNew = true
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly when not coming from new Visit', () => {
        props.visits.isNew = false
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('correctly add a tag', () => {
        const el = shallow(<Component {...props} />)
        el
            .find('#add-tag-input-field')
            .simulate('change', {
                preventDefault: () => {},
                target: { name: 'add-tag-input-field', value: '123123' },
            })
        el.update()
        el
            .find('#add-tag-input-button')
            .simulate('click', {
                preventDefault: () => {},
                target: { name: 'add-tag-input-button', value: 'value' },
            })
        el.update()
        expect(el).toMatchSnapshot()
    })

    it('shows validation error when adding an invalid tag number', () => {
        const el = shallow(<Component {...props} />)
        el
            .find('#add-tag-input-field')
            .simulate('change', {
                preventDefault: () => {},
                target: { name: 'add-tag-input-field', value: '123' },
            })
        el.update()
        el
            .find('#add-tag-input-button')
            .simulate('click', {
                preventDefault: () => {},
                target: { name: 'add-tag-input-button', value: 'value' },
            })
        el.update()
        expect(el).toMatchSnapshot()
    })

    it('returns a vaildation error when the tag API returns an error', () => {
        const el = shallow(<Component {...props} />)
        props.visits.simulateValidationError()
        el.update()
        expect(el).toMatchSnapshot()
    })
})
