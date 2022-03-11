import React from 'react'
import { shallow } from 'enzyme'

import { VisitDetail } from '.'
import { RoutingMock, ProfilesMock } from '../../stores/mock'
import { VisitsMock } from '../../stores/mock/VisitsMock'
import { Visit } from '../../models/Visit'

describe('<VisitDetail />', () => {
    let props: any
    const Component = (VisitDetail as any).wrappedComponent
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
        }
    })

    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('renders correctly when NEW Profile', () => {
        const match = {
            params: {
                profileId: 'new',
            },
        }
        expect(
            shallow(<Component {...props} match={match} />)
        ).toMatchSnapshot()
    })

    it('calls the api correctly', () => {
        shallow(<Component {...props} />)
        expect(props.visits.getDetail).toHaveBeenCalled()
        expect(props.profiles.getDetail).toHaveBeenCalled()
        //archeetyps are present in the VisitsMock mock
        expect(props.visits.getArchetypes).not.toHaveBeenCalled()
    })

    it('calls the archetypes api correctly', () => {
        const newProps = {
            ...props,
            visits: {
                ...props.visits,
                archetypes: { primary: {}, secondary: {} },
            },
        }
        shallow(<Component {...newProps} />)
        expect(props.visits.getArchetypes).toHaveBeenCalled()
    })

    it('calls the right apis on Save', () => {
        const el = shallow(<Component {...props} />)
        const instance = el.instance() as any
        instance.save(new Visit())
        expect(props.visits.save).toHaveBeenCalled()
    })

    it('calls the archetypes API if archetypes are not present', () => {
        const newProps = {
            ...props,
            visits: { ...props.visits, archetypes: {} },
        }
        shallow(<Component {...newProps} />)
        expect(newProps.visits.getArchetypes).toHaveBeenCalled()
    })

    it('does not call the archetypes API if archetypes are present', () => {
        shallow(<Component {...props} />)
        expect(props.visits.getArchetypes).not.toHaveBeenCalled()
    })

    it('renders correctly when data is loading', () => {
        const el = shallow(
            <Component
                {...props}
                profiles={{ ...props.profiles, isLoading: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    it('handles API errors', () => {
        props.profiles.isError = true
        props.profiles.errorMessage = 'yeah'
        const el = shallow(<Component {...props} />)
        expect(el).toMatchSnapshot()
    })
})
