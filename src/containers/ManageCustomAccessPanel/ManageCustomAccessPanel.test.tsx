import React from 'react'
import { shallow } from 'enzyme'
import { ProfileStore } from '../../stores'
import { ManageCustomAccessPanel } from '.'
import { RoutingMock, VisitsMock } from '../../stores/mock'
import { LockGroupMock } from '../../stores/mock/LockGroupsMock'

describe('<ManageCustomAccessPanel />', () => {
    let props: any
    const Component = (ManageCustomAccessPanel as any).wrappedComponent
    beforeEach(() => {
        props = {
            removeAccessFn: jest.fn(),
            addAccessFn: jest.fn(),
            profiles: new ProfileStore(),
            routing: new RoutingMock() as any,
            visits: new VisitsMock() as any,
            lockGroups: new LockGroupMock() as any,
        }
    })
    it('renders correctly with no data', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly with data', () => {
        props.lockGroups.items = props.lockGroups.data
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })

    it('renders correctly when coming from new Visit', () => {
        props.visits.isNew = true
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })

    it('renders correctly when NOT coming from new Visit', () => {
        props.visits.isNew = false
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })

    it('renders correctly with added lockgroups', () => {
        props.lockGroups.items = props.lockGroups.data
        props.visits.detail = {
            ...props.visits.detail,
            lockGroups: [props.lockGroups.items],
        }
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })
})
