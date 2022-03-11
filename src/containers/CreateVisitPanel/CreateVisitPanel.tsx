import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
    InlineDatePicker,
    InlineTimePicker,
    MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import moment from 'moment'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import DateFnsUtils from '@date-io/moment'
import HotelIcon from '@material-ui/icons/Hotel'
import PersonIcon from '@material-ui/icons/Person'
import { Button, MenuItem, FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'
// import SaveIcon from '@material-ui/icons/Save'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'

import { Boundary, ArchetypeCard } from '../../components'

import {
    Wrapper,
    Dropdown,
    ProfileName,
    Container,
    Title,
    PickersContainer,
    SelectedArchetypesContainer,
    DateContainer,
    TitleField,
    ArchetypesContainer,
    // ActionsBar,
    // ButtonsContainer,
} from './Components'
import { ActionsBar, ButtonsContainer } from '../../components/CommonComponents'

import { StoreNames, ProfileStore, Routing } from '../../stores'
import { VisitStore } from '../../stores/Visits'

export interface CreateVisitPanelProps {
    match?: { params: { profileId: string } }
    saveFn: Function
}

export interface CreateVisitPanelConnectedProps extends CreateVisitPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

export interface CreateVisitPanelState {
    from: Date
    to: Date | null
    selectedArchetypes: string[]
    noEndDate: boolean
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class CreateVisitPanel extends Component<
    CreateVisitPanelProps,
    CreateVisitPanelState
> {
    get store() {
        return this.props as CreateVisitPanelConnectedProps
    }
    constructor(props: CreateVisitPanelProps) {
        super(props)
        this.state = {
            from: new Date(),
            to: null,
            selectedArchetypes: [],
            noEndDate: false,
        }
    }

    public handleDateFromChange = (value: any) => {
        this.setState({ from: value })
    }

    public handleDateToChange = (value: any) => {
        this.setState({ to: value })
    }

    public getFutureDate = () => {
        const today = new Date()
        return today.setFullYear(today.getFullYear() + 100)
    }

    public removeArchetype = (e: any, id: string) => {
        if (e) e.preventDefault()
        const { selectedArchetypes } = this.state
        this.setState({
            selectedArchetypes: selectedArchetypes.filter(item => item !== id),
        })
    }

    public addArchetype = (e: any, id: string) => {
        if (e) e.preventDefault()
        const { selectedArchetypes } = this.state
        if (!selectedArchetypes.filter(item => item === id).length) {
            this.setState({ selectedArchetypes: [...selectedArchetypes, id] })
        }
    }

    public save = (e?: any, navigate?: string) => {
        const { from, to, selectedArchetypes, noEndDate } = this.state
        this.props.saveFn(
            {
                fromDate: from.toISOString(),
                toDate: to && !noEndDate ? to.toISOString() : null,
                archetypeIds: selectedArchetypes,
            },
            navigate
        )
    }

    public hideToDate = (e: any) => {
        this.setState({ noEndDate: e.target.checked, to: null })
    }

    public render() {
        const { archetypes } = this.store.visits
        const { item: profile } = this.store.profiles
        const { from, to: oldTo, selectedArchetypes, noEndDate } = this.state
        const to = oldTo
            ? moment(oldTo)
                  .add(15, 'm')
                  .toDate()
            : null
        const invalidDates = !noEndDate && !!to && from > to
        return (
            <Wrapper>
                <Container>
                    <Boundary>
                        <Title>
                            <TitleField>
                                <span>
                                    <HotelIcon /> Add Visit
                                </span>
                                <span>
                                    <KeyboardArrowRightIcon />
                                </span>
                                <ProfileName>
                                    <PersonIcon />
                                    {`${profile.firstName} ${profile.lastName}`}
                                </ProfileName>
                            </TitleField>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className={'no-end-date-checkbox'}
                                        checked={noEndDate}
                                        onChange={this.hideToDate}
                                        value="checkedA"
                                    />
                                }
                                label="No End Date"
                            />
                        </Title>
                    </Boundary>
                    <Boundary>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ReactCSSTransitionGroup
                                transitionName="fade"
                                transitionAppear={true}
                                transitionAppearTimeout={200}
                                transitionEnterTimeout={200}
                                transitionLeaveTimeout={200}
                            >
                                <PickersContainer className="pickers">
                                    <DateContainer>
                                        <InlineDatePicker
                                            label="Date From"
                                            className={'date-from-datepicker'}
                                            value={from}
                                            maxDate={to || this.getFutureDate()}
                                            maxDateMessage={
                                                '"Date From" cannot be before "Date To"'
                                            }
                                            format={'LL, (dddd)'}
                                            // minDate={new Date()}
                                            onChange={this.handleDateFromChange}
                                        />
                                        <InlineTimePicker
                                            className={'date-from-timepicker'}
                                            minutesStep={15}
                                            label="Time From"
                                            value={from}
                                            error={invalidDates}
                                            helperText={
                                                invalidDates
                                                    ? '"Time From" cannot be before "Time To"'
                                                    : null
                                            }
                                            onChange={this.handleDateFromChange}
                                        />
                                    </DateContainer>
                                    {!noEndDate && (
                                        <DateContainer>
                                            <InlineDatePicker
                                                label="Date To"
                                                className={'date-to-datepicker'}
                                                value={oldTo}
                                                format={'LL, (dddd)'}
                                                // minDate={new Date()}
                                                onChange={
                                                    this.handleDateToChange
                                                }
                                            />
                                            <InlineTimePicker
                                                minutesStep={15}
                                                className={'date-to-timepicker'}
                                                label="Time To"
                                                value={oldTo}
                                                onChange={
                                                    this.handleDateToChange
                                                }
                                            />
                                        </DateContainer>
                                    )}
                                </PickersContainer>
                            </ReactCSSTransitionGroup>
                        </MuiPickersUtilsProvider>
                    </Boundary>
                </Container>
                <Boundary>
                    <ArchetypesContainer>
                        {archetypes.primary.map(item => (
                            <div key={item.id}>
                                <Button
                                    className={'archetype-button'}
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                        selectedArchetypes.indexOf(item.id) !==
                                        -1
                                    }
                                    onClick={(e: any) =>
                                        this.addArchetype(e, item.id)
                                    }
                                >
                                    {' '}
                                    {item.name}
                                </Button>
                            </div>
                        ))}
                        <Dropdown
                            autoWidth={true}
                            value={'0'}
                            onChange={(e: any) =>
                                this.addArchetype(e, e.target.value)
                            }
                        >
                            <MenuItem value="0" disabled={true}>
                                Other Archetypes
                            </MenuItem>
                            {archetypes.secondary.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Dropdown>
                    </ArchetypesContainer>
                </Boundary>
                <Boundary>
                    <SelectedArchetypesContainer>
                        <ReactCSSTransitionGroup
                            transitionName="expand"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {selectedArchetypes.map(item => (
                                <ArchetypeCard
                                    key={item}
                                    removeItemFn={this.removeArchetype}
                                    archetype={
                                        archetypes.primary.find(
                                            entry => entry.id === item
                                        ) ||
                                        archetypes.secondary.find(
                                            entry => entry.id === item
                                        )
                                    }
                                />
                            ))}
                        </ReactCSSTransitionGroup>
                    </SelectedArchetypesContainer>
                </Boundary>
                <Boundary>
                    <ActionsBar>
                        <Button
                            variant="contained"
                            onClick={() =>
                                this.store.routing.goToPage(
                                    `/profile/${this.store.profiles.item.id}`
                                )
                            }
                        >
                            <KeyboardArrowLeftIcon />
                            Cancel
                        </Button>
                        <ButtonsContainer>
                            <Button
                                className={'detail-panel-save-button'}
                                variant="contained"
                                color="primary"
                                onClick={this.save}
                                disabled={invalidDates}
                            >
                                Next
                                <KeyboardArrowRightIcon />
                            </Button>
                            {/* <Button
                                className={'detail-panel-add-tags-button'}
                                variant="contained"
                                color="primary"
                                onClick={() => this.save(null, 'tag')}
                                disabled={invalidDates}
                            >
                                <VpnKeyIcon />
                                &nbsp; {'Save and manage Tags'}
                            </Button>
                            <Button
                                className={'detail-panel-add-access-button'}
                                variant="contained"
                                color="primary"
                                onClick={() => this.save(null, 'access')}
                                disabled={invalidDates}
                            >
                                <MeetingRoomIcon />
                                &nbsp; {'Save and manage Access'}
                            </Button> */}
                        </ButtonsContainer>
                    </ActionsBar>
                </Boundary>
            </Wrapper>
        )
    }
}
