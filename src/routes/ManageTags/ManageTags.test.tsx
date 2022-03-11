import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import { ManageTags } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock'
import { VisitsMock } from '../../stores/mock/VisitsMock'

describe('<ManageTags />', () => {
    let props: any
    const Component = (ManageTags as any).wrappedComponent
    beforeEach(() => {
        props = {
            match: {
                params: {
                    profileId: '123',
                    visitId: '456',
                },
            },
            profiles: new ProfilesMock(),
            routing: new RoutingMock(),
            visits: new VisitsMock(),
        }
    })

    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly when data is loading', () => {
        const el = shallow(
            <Component
                {...props}
                lockGroups={{ ...props.lockGroups, loading: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    it('calls the apis correctly', () => {
        shallow(<Component {...props} />)
        expect(props.profiles.getDetail).toHaveBeenCalled()
        expect(props.visits.getDetail).toHaveBeenCalled()
    })

    it('calls the correct API on addTag', () => {
        const el = shallow(<Component {...props} />)
				const ret = (el.instance() as any)
				ret.addTag()
        expect(props.visits.addTag).toHaveBeenCalled()
    })

    it('calls the correct API on removeTag', () => {
        const el = shallow(<Component {...props} />)
				const ret = (el.instance() as any)
				ret.removeTag()
        expect(props.visits.removeTag).toHaveBeenCalled()
    })

    it('renders correctly when visit status is loading', () => {
        const el = shallow(
            <Component {...props} visits={{ ...props.visits, loading: true }} />
        )
        expect(el).toMatchSnapshot()
    })

    it('handles API errors', () => {
        const el = shallow(
            <Component
                {...props}
                lockGroups={{ ...props.lockGroups, isError: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })
})
