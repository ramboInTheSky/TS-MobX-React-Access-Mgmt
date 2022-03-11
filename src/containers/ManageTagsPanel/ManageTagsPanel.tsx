import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Loader from 'react-loader'

import PersonIcon from '@material-ui/icons/Person'
import { Button } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import HotelIcon from '@material-ui/icons/Hotel'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import { Boundary, CardContainer } from '../../components'

import {
    Wrapper,
    TitleField,
    ProfileName,
    Container,
    Title,
    Action,
    InputContainer,
    Input,
    AddTagContainer,
    VisitDateFrom,
    VisitDateTo,
} from './Components'
import { ActionsBar, ButtonsContainer } from '../../components/CommonComponents'

import { StoreNames, ProfileStore, Routing } from '../../stores'
import { VisitStore } from '../../stores/Visits'
import { Tag } from '../../models/Tag'
import { TagsContainer } from '../ViewVisitPanel/Components'
import { getDateTimeString } from '../../utils'
import { VideoCapture } from '../../components/VideoCapture'

export interface ManageTagsPanelProps {
    addTag: Function
    removeTag: Function
}

export interface ManageTagsPanelConnectedProps extends ManageTagsPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

export interface ManageTagsPanelState {
    currentTag?: string
    validation: { currentTag?: string }
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class ManageTagsPanel extends Component<
    ManageTagsPanelProps,
    ManageTagsPanelState
> {
    get store() {
        return this.props as ManageTagsPanelConnectedProps
    }

    constructor(props: ManageTagsPanelProps) {
        super(props)
        this.state = {
            currentTag: undefined,
            validation: { currentTag: undefined },
        }
    }

    public componentDidMount() {
        this.store.visits.clearErrors()
    }

    public done = () => {
        this.store.visits.toggleEditing()
        this.store.routing.goToPage(
            `/profile/${this.store.profiles.item.id}/visit/${
                this.store.visits.item.id
            }`
        )
    }

    public addTag = async (e: any) => {
        if (!e.keyCode || (e.keyCode && e.keyCode === 13)) {
            const { currentTag } = this.state
            if (currentTag && currentTag.length >= 6) {
                const tag = new Tag(currentTag)
                const success = await this.props.addTag(tag)
                if (success) this.clearSelection()
            } else {
                this.setState({
                    validation: {
                        currentTag: 'Tag numbers should be at least 6 numbers',
                    },
                })
            }
        }
    }

    public removeTag = async (e: any, id: string) => {
        return await this.props.removeTag(id)
    }

    public handleChange = (e: any) => {
        if (e) e.preventDefault()
        this.setState(
            {
                currentTag: e.target.value,
                validation: { currentTag: undefined },
            },
            () => this.store.visits.clearErrors()
        )
    }

    public setTag = (value: any, error: any) => {
        this.setState({
            currentTag: value,
            validation: { currentTag: error },
        })
    }

    public clearSelection = () => {
        this.setState(
            {
                currentTag: undefined,
                validation: { currentTag: undefined },
            },
            () => this.store.visits.clearErrors()
        )
    }

    public navigateBack = (isFromViewDetail: boolean) => {
        if (isFromViewDetail) {
            this.store.routing.goToPage(
                `/profile/${this.store.profiles.item.id}/visit/${
                    this.store.visits.item.id
                }`
            )
        } else {
            this.store.routing.goToPage(
                `/profile/${this.store.profiles.item.id}/visit/${
                    this.store.visits.item.id
                }/access`
            )
        }
    }

    public render() {
        const {
            item: visit,
            isValidationError,
            validationError,
            isTagLoading,
        } = this.store.visits
        const { item: profile } = this.store.profiles
        const { currentTag, validation } = this.state
        const isFromViewDetail = !this.store.visits.isNew
        return (
            <Wrapper>
                <Container>
                    <Boundary>
                        <Title>
                            <TitleField>
                                <ProfileName>
                                    <PersonIcon />
                                    {`${profile.firstName} ${profile.lastName}`}
                                </ProfileName>
                                <span>
                                    <KeyboardArrowRightIcon />
                                </span>
                                <span>
                                    <HotelIcon /> Visit &nbsp;
                                </span>
                                <VisitDateFrom>
                                    {getDateTimeString(visit.fromDate)}
                                </VisitDateFrom>
                                <span>
                                    <ArrowForwardIcon />
                                </span>
                                <VisitDateTo>
                                    {getDateTimeString(visit.toDate)}
                                </VisitDateTo>
                                <span>
                                    <KeyboardArrowRightIcon />
                                </span>
                                <span>
                                    <VpnKeyIcon /> Manage Tags
                                </span>
                            </TitleField>
                        </Title>
                    </Boundary>
                    <Boundary>
                        <AddTagContainer>
                            <InputContainer elevation={1}>
                                {currentTag && (
                                    <Action
                                        id="add-tag-input-clear"
                                        aria-label="Clear"
                                        onClick={this.clearSelection}
                                        title="Clear Search"
                                    >
                                        <CloseIcon />
                                    </Action>
                                )}
                                <Input
                                    id="add-tag-input-field"
                                    name="add-tag-input-field"
                                    placeholder={'Add a Tag number'}
                                    onChange={this.handleChange}
                                    value={currentTag || ''}
                                    type="number"
                                    error={
                                        validation.currentTag ||
                                        isValidationError
                                    }
                                    helperText={
                                        validation.currentTag || validationError
                                    }
                                    onKeyDown={this.addTag}
                                />
                                <Loader
                                    loaded={!isTagLoading}
                                    options={{
                                        scale: 0.5,
                                        position: 'relative',
                                    }}
                                >
                                    <div className="--flex">
                                        <Action
                                            id="add-tag-input-button"
                                            aria-label="Search"
                                            onClick={this.addTag}
                                            title="Search"
                                        >
                                            <AddIcon />
                                        </Action>
                                        <VideoCapture setValue={this.setTag} />
                                    </div>
                                </Loader>
                            </InputContainer>
                        </AddTagContainer>
                    </Boundary>
                </Container>
                {visit.tagNumbers && visit.tagNumbers.length ? (
                    <Boundary>
                        <TagsContainer>
                            <CardContainer
                                items={visit.tagNumbers}
                                removeItemFn={this.removeTag}
                                type="tags"
                            />
                        </TagsContainer>
                    </Boundary>
                ) : null}
                <Boundary>
                    <ActionsBar>
                        <Button
                            className={'detail-panel-manage-rooms-button'}
                            variant="contained"
                            onClick={() => this.navigateBack(isFromViewDetail)}
                        >
                            <KeyboardArrowLeftIcon />
                            Back
                        </Button>
                        {!isFromViewDetail && (
                            <ButtonsContainer>
                                <Button
                                    className={'manage-tags-panel-done-button'}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.done}
                                >
                                    <CheckCircleIcon />
                                    &nbsp; Finish
                                </Button>
                            </ButtonsContainer>
                        )}
                    </ActionsBar>
                </Boundary>
            </Wrapper>
        )
    }
}
