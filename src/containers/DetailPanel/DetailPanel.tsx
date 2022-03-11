import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PersonIcon from '@material-ui/icons/Person'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import HotelIcon from '@material-ui/icons/Hotel'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ProfileStore, StoreNames, Routing } from '../../stores'

import { Boundary } from '../../components'
import {
    Wrapper,
    Field,
    Title,
    FieldsContainer,
    ActionsBar,
    Name,
    ButtonsContainer,
    InputContainer,
    Input,
    SingleColumnFieldSet,
    TwoColumnsFieldset,
    NotesInputContainer,
    Action,
} from './Components'
import { Profile } from '../../models/Profile'
import { VisitStore } from '../../stores/Visits'
import { FormControlLabel, Checkbox } from "@material-ui/core";

export interface DetailPanelProps {
    callback: (form: any, addVisit?: boolean) => void
    // match?: { params: { profileId: string } }
}
export interface DetailPanelConnectedProps extends DetailPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

export interface DetailPanelState {
    form: Partial<Profile>
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class DetailPanel extends Component<DetailPanelProps, DetailPanelState> {
    get store() {
        return this.props as DetailPanelConnectedProps
    }
    constructor(props: DetailPanelProps) {
        super(props)
        this.state = {
            form: { ...this.store.profiles.item },
        }
    }

    public componentDidMount() {
        this.store.visits.toggleEditing(false)
    }

    public componentWillReact() {
        if (this.store.profiles.isFresh()) {
            this.setState({ form: { ...this.store.profiles.item } })
        }
    }

    public toggleEdit = (e: any, clear?: boolean) => {
        e.preventDefault()
        this.store.profiles.toggleEditing()
        this.setState({
            form: clear ? this.store.profiles.item : this.state.form,
        })
    }

    public onChange = (e: any) => {
        const {
            target: { name, value, type, checked }
        } = e
        this.setState({ form: { ...this.state.form, [name]: (type === 'checkbox') ? checked : value } })
    }

    public cancelEdit = (e: any) =>
        !this.store.profiles.item.id
            ? this.store.routing.goToPage('/')
            : this.toggleEdit(e, true)

    public saveOrAddVisit = () => {
        const { editing } = this.store.profiles
        if (editing) this.props.callback(this.state.form, true)
        else {
            this.store.routing.goToPage(
                `/profile/${this.store.profiles.item.id}/visit/new`
            )
        }
    }

    public render() {
        const { form } = this.state
        const { editing, item } = this.store.profiles
        return (
            <Boundary>
                <Wrapper>
                    <Title>
                        <span>
                            <PersonIcon />
                            Profile
                        </span>
                        {!editing && (
                            <Action
                                id="edit-icon-button"
                                aria-label="Edit"
                                onClick={this.toggleEdit}
                                title="Edit"
                            >
                                <EditIcon />
                            </Action>
                        )}
                        {editing && (<FormControlLabel
                            control={
                                <Checkbox
                                    className={'no-end-date-checkbox'}
                                    name="isStaff"
                                    checked={form.isStaff}
                                    onChange={this.onChange}
                                />
                            }
                            label="Is staff"
                        />
                        )}
                    </Title>
                    {editing ? (
                        <ReactCSSTransitionGroup
                            transitionName="expand"
                            transitionAppear={true}
                            transitionAppearTimeout={100}
                            transitionEnterTimeout={100}
                            transitionLeaveTimeout={100}
                        >
                            <TwoColumnsFieldset>
                                <InputContainer elevation={1}>
                                    <Input
                                        placeholder="First Name"
                                        name="firstName"
                                        onChange={this.onChange}
                                        value={form.firstName}
                                    />
                                </InputContainer>
                                <InputContainer elevation={1}>
                                    <Input
                                        placeholder="Last Name"
                                        name="lastName"
                                        onChange={this.onChange}
                                        value={form.lastName}
                                    />
                                </InputContainer>
                            </TwoColumnsFieldset>
                            <SingleColumnFieldSet>
                                <InputContainer elevation={1}>
                                    <Input
                                        placeholder="Company"
                                        name="company"
                                        onChange={this.onChange}
                                        value={form.company}
                                    />
                                </InputContainer>
                                <InputContainer elevation={1}>
                                    <Input
                                        placeholder="Mobile Number"
                                        name="mobileNumber"
                                        onChange={this.onChange}
                                        value={form.mobileNumber}
                                    />
                                </InputContainer>
                                <InputContainer elevation={1}>
                                    <Input
                                        placeholder="Email Address"
                                        name="emailAddress"
                                        onChange={this.onChange}
                                        value={form.emailAddress}
                                    />
                                </InputContainer>
                                <NotesInputContainer elevation={1}>
                                    <Input
                                        multiline={true}
                                        placeholder="Notes"
                                        name="notes"
                                        onChange={this.onChange}
                                        value={form.notes}
                                    />
                                </NotesInputContainer>
                            </SingleColumnFieldSet>
                        </ReactCSSTransitionGroup>
                    ) : (
                        <FieldsContainer>
                            <ReactCSSTransitionGroup
                                transitionName="fade"
                                transitionAppear={true}
                                transitionAppearTimeout={200}
                                transitionEnterTimeout={200}
                                transitionLeaveTimeout={200}
                            >
                                <Name>{`${item.firstName} ${
                                    item.lastName
                                }`}</Name>
                                <Field key="company">{item.company}</Field>
                                <Field key="mobileNumber">
                                    {item.mobileNumber}
                                </Field>
                                <Field key="emailAddress">
                                    {item.emailAddress}
                                </Field>
                            </ReactCSSTransitionGroup>
                        </FieldsContainer>
                    )}

                    <ActionsBar>
                        {editing ? (
                            <Button
                                className={'cancel-edit-button'}
                                variant="contained"
                                onClick={this.cancelEdit}
                            >
                                <KeyboardArrowLeftIcon />
                                &nbsp;Cancel
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => this.store.routing.goToPage('/')}
                            >
                                <KeyboardArrowLeftIcon />
                                &nbsp;Back
                            </Button>
                        )}
                        <ButtonsContainer>
                            {editing && (
                                <Button
                                    className={'detail-panel-save-button'}
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        this.props.callback(this.state.form)
                                    }
                                >
                                    <SaveIcon />
                                    &nbsp;Save
                                </Button>
                            )}
                            {!editing && (
                                <Button
                                    className={'detail-panel-add-visit-button'}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.saveOrAddVisit}
                                >
                                    <HotelIcon />
                                    Add Visit
                                </Button>
                            )}
                        </ButtonsContainer>
                    </ActionsBar>
                </Wrapper>
            </Boundary>
        )
    }
}
