import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PersonIcon from '@material-ui/icons/Person'
import { Button } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'
// import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
// import EditIcon from '@material-ui/icons/Edit'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import HotelIcon from '@material-ui/icons/Hotel'
import { Boundary, ArchetypeCard, CardContainer } from '../../components'

import {
    Wrapper,
    RoomsContainer,
    TagsContainer,
    ProfileName,
    DatesContainer,
    Title,
    Container,
    DateContainer,
    TitleField,
    ArchetypesContainer,
    ActionsBar,
    ButtonsContainer,
} from './Components'

import { StoreNames, ProfileStore, Routing } from '../../stores'
import { VisitStore } from '../../stores/Visits'
import { getDateTimeString } from '../../utils'
import { oc } from 'ts-optchain'

export interface ViewVisitPanelProps {
    match?: { params: { profileId: string } }
}

export interface ViewVisitPanelConnectedProps extends ViewVisitPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class ViewVisitPanel extends Component<ViewVisitPanelProps> {
    get store() {
        return this.props as ViewVisitPanelConnectedProps
    }
    constructor(props: ViewVisitPanelProps) {
        super(props)
        this.store.visits.isNew = false
    }

    public render() {
        const { archetypes } = this.store.visits
        const { item: profile } = this.store.profiles
        const { item: visit } = this.store.visits
        const allArchetypes = archetypes.primary.concat(archetypes.secondary)
        return (
            <Wrapper>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={200}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    <Container>
                        <Boundary>
                            <Title>
                                <TitleField>
                                    <span>
                                        <HotelIcon /> Visit
                                    </span>
                                    <span>
                                        <KeyboardArrowRightIcon />
                                    </span>
                                    <ProfileName>
                                        <PersonIcon />
                                        {`${profile.firstName} ${
                                            profile.lastName
                                        }`}
                                    </ProfileName>
                                </TitleField>
                                {/* {true && (
                                    <Action
                                        id="edit-icon-button"
                                        aria-label="Edit"
                                        onClick={() => console.log('editing')}
                                        title="Edit"
                                    >
                                        <EditIcon />
                                    </Action>
                                )} */}
                            </Title>
                        </Boundary>
                        <Boundary>
                            <DatesContainer className="pickers">
                                <DateContainer className="date-from">
                                    {getDateTimeString(visit.fromDate)}
                                </DateContainer>
                                <span>
                                    <ArrowForwardIcon
                                        style={{
                                            fontSize: '3rem',
                                            color: '#8bd08b',
                                        }}
                                    />
                                </span>
                                <DateContainer className="date-to">
                                    {getDateTimeString(visit.toDate)}
                                </DateContainer>
                            </DatesContainer>
                        </Boundary>
                    </Container>
                    {visit.tagNumbers && (
                        <Boundary>
                            <TagsContainer>
                                <CardContainer
                                    items={visit.tagNumbers}
                                    type="tags"
                                    button={{
                                        title: 'Manage',
                                        fn: () =>
                                            this.store.routing.goToPage(
                                                `/profile/${
                                                    this.store.profiles.item.id
                                                }/visit/${
                                                    this.store.visits.item.id
                                                }/tags`
                                            ),
                                    }}
                                />
                            </TagsContainer>
                        </Boundary>
                    )}
                    {visit.lockGroups && (
                        <Boundary>
                            <RoomsContainer>
                                <CardContainer
                                    items={visit.lockGroups}
                                    type="rooms"
                                    button={{
                                        title: 'Manage',
                                        fn: () =>
                                            this.store.routing.goToPage(
                                                `/profile/${
                                                    this.store.profiles.item.id
                                                }/visit/${
                                                    this.store.visits.item.id
                                                }/access`
                                            ),
                                    }}
                                />
                            </RoomsContainer>
                        </Boundary>
                    )}
                    <Boundary>
                        <ArchetypesContainer>
                            {oc(visit).archetypes.length &&
                                allArchetypes
                                    .filter(item =>
                                        oc(visit)
                                            .archetypes([])
                                            .find(
                                                internalItem =>
                                                    item.id === internalItem.id
                                            )
                                    )
                                    .map(item => (
                                        <ArchetypeCard
                                            key={item.id}
                                            archetype={item}
                                        />
                                    ))}
                        </ArchetypesContainer>
                    </Boundary>
                    <Boundary>
                        <ActionsBar>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    this.store.routing.goToPage(
                                        `/profile/${
                                            this.store.profiles.item.id
                                        }`
                                    )
                                }
                            >
                                <KeyboardArrowLeftIcon />
                                Back
                            </Button>
                            <ButtonsContainer>
                                {/* <Button
                                    className={
                                        'detail-panel-manage-rooms-button'
                                    }
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        this.store.routing.goToPage(
                                            `/profile/${
                                                this.store.profiles.item.id
                                            }/visit/${
                                                this.store.visits.item.id
                                            }/access`
                                        )
                                    }
                                >
                                    <MeetingRoomIcon />
                                    &nbsp;{'Manage Access'}
                                </Button> */}
                                {/* <Button
                                    className={
                                        'detail-panel-manage-tags-button'
                                    }
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        this.store.routing.goToPage(
                                            `/profile/${
                                                this.store.profiles.item.id
                                            }/visit/${
                                                this.store.visits.item.id
                                            }/tag`
                                        )
                                    }
                                >
                                    <VpnKeyIcon />
                                    &nbsp;{'Manage Tags'}
                                </Button> */}
                            </ButtonsContainer>
                        </ActionsBar>
                    </Boundary>
                </ReactCSSTransitionGroup>
            </Wrapper>
        )
    }
}
