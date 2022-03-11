import React from 'react'
import { shallow } from 'enzyme'
import { mockDateConstructor, ProfilesMock } from '../../stores/mock'

import { CreateVisitPanel } from '.'
import { VisitsMock, RoutingMock } from '../../stores/mock'

mockDateConstructor()

describe('<CreateVisitPanel />', () => {
    let props: any
    const Component = (CreateVisitPanel as any).wrappedComponent
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
            saveFn: jest.fn(),
        }
    })

    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('hides dateto and timeTo when the checkbox is clicked', () => {
        const el = shallow(<Component {...props} />)
        el
            .find('[label="No End Date"]')
            .simulate('click', {
                preventDefault: () => {},
                target: { name: 'input', value: 'value' },
            })
        el.update()
        expect(el).toMatchSnapshot()
    })

    it('disables buttons if DateFrom is past DateTo', () => {
        const el = shallow(<Component {...props} />)
        el.update()
        const today = new Date('11/11/1970')
        const future = new Date('11/11/3000')
        el.setState({ noEndDate: false, from: future, to: today }, () => {
            el.update()
            const saveButton = el.find('.detail-panel-save-button')
            const saveButton2 = el.find('.detail-panel-add-tags-button')
            const saveButton3 = el.find('.detail-panel-add-access-button')
            expect(saveButton).toMatchSnapshot()
            expect(saveButton2).toMatchSnapshot()
            expect(saveButton3).toMatchSnapshot()
        })
    })

    it('selects an archetype', () => {
        props.visits.archetypes = {
            primary: [
                {
                    id: 'd3aa88e2-c754-41e0-8ba6-4198a34aa0a1',
                    archetypeName: 'Short Stay',
                    archetypePrimary: true,
                    ArchetypeLockGroupNames: ['lockGroup1', 'lockGroup2'],
                },
            ],
            secondary: [],
        }
        props.visits.rawArchetypes = [
            {
                id: 'd3aa88e2-c754-41e0-8ba6-4198a34aa0a1',
                archetypeName: 'Short Stay',
                archetypePrimary: true,
                ArchetypeLockGroupNames: ['lockGroup1', 'lockGroup2'],
            },
        ]
        const el = shallow(<Component {...props} />)
        el
            .find('.archetype-button')
            .simulate('click', {
                preventDefault: () => {},
                target: { name: 'input', value: 'value' },
            })
        el.update()
        expect(el).toMatchSnapshot()
    })
})
