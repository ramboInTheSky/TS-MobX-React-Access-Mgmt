import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Loader from 'react-loader'
import PersonIcon from '@material-ui/icons/Person'
import { Button } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
// import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import HotelIcon from '@material-ui/icons/Hotel'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddIcon from '@material-ui/icons/Add'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'

import {
    Routing,
    StoreNames,
    ProfileStore,
    LockGroupStore,
    VisitStore,
} from '../../stores'
import {
    ActionIcon,
    Wrapper,
    TitleField,
    ProfileName,
    Container,
    Title,
    VisitDateFrom,
    VisitDateTo,
    RoomsContainer,
} from './Components'

import { ActionsBar, ButtonsContainer } from '../../components/CommonComponents'

import { Grid, GridApi, Boundary, CardContainer } from '../../components'
import { getDateTimeString } from '../../utils'
import { sortLockGroups } from '../../utils/sorting'

export interface ManageCustomAccessPanelProps {
    addAccessFn: Function
    removeAccessFn: Function
}

export interface ManageCustomAccessPanelConnectedProps
    extends ManageCustomAccessPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    lockGroups: LockGroupStore
}

@inject(
    StoreNames.profiles,
    StoreNames.routing,
    StoreNames.visits,
    StoreNames.lockGroups
)
@observer
export class ManageCustomAccessPanel extends React.Component<
    ManageCustomAccessPanelProps
> {
    public gridApi?: GridApi
    public colDef = [
        {
            headerName: '',
            width: 30,
            field: 'id',
            cellRendererFramework: (row: any) => (
                <ActionIcon
                    className={`add-room-access-icon-for-${row.data.id}`}
                    aria-label="Add Rooms Access"
                    title="Add Rooms Access"
                    onClick={(e: any) => this.addAccess(e, row.data.id)}
                    disabled={this.store.visits.isRoomLoading(row.data.id)}
                >
                    <Loader
                        loaded={!this.store.visits.isRoomLoading(row.data.id)}
                        options={{ scale: 0.5, left: '100%' }}
                    >
                        <AddIcon data-title="Add Rooms Access" />
                    </Loader>
                </ActionIcon>
            ),
        },
        {
            headerName: 'Name',
            field: 'name',
            minWidth: 70,
        },
        {
            headerName: 'Type',
            width: 50,
            field: 'type',
        },
        {
            headerName: 'Notes',
            minWidth: 100,
            field: 'notes',
        },
        
    ]
    get store() {
        return this.props as ManageCustomAccessPanelConnectedProps
    }

    constructor(props: ManageCustomAccessPanelProps) {
        super(props)
        this.gridApi = undefined
    }

    public done = () => {
        this.store.routing.goToPage(
            `/profile/${this.store.profiles.item.id}/visit/${
                this.store.visits.item.id
            }`
        )
    }

    public addAccess = async (e: any, id: string) => {
        this.props.addAccessFn(e, id)
        return (
            this.gridApi &&
            this.gridApi.refreshCells({
                force: true,
            })
        )
    }

    public removeAccess = async (e: any, id: string) => {
        await this.props.removeAccessFn(e, id)
    }

    public getGridApi = (gridApi: any) => {
        this.gridApi = gridApi
    }

    public render() {
        const { item: visit } = this.store.visits
        const { item: profile } = this.store.profiles
        const gridItems =
            this.store.visits.item &&
            this.store.visits.item.lockGroups &&
            this.store.visits.item.lockGroups.length
                ? this.store.lockGroups.items.filter(
                      lockGroup =>
                          !this.store.visits.item!.lockGroups!.find(
                              (visitLockGroup: any) =>
                                  visitLockGroup.id === lockGroup.id
                          )
                  )
                : this.store.lockGroups.items
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
                                    <MeetingRoomIcon /> Manage Custom Access
                                </span>
                            </TitleField>
                        </Title>
                    </Boundary>
                </Container>
                <Boundary>
                    <Loader loaded={!this.store.lockGroups.isLoading} />
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={100}
                        transitionEnterTimeout={100}
                        transitionLeaveTimeout={100}
                    >
                        {gridItems.length && (
                            <Grid
                                onRowClicked={(row) =>
                                    this.addAccess(null, row.data.id)
                                }
                                loading={this.store.lockGroups.isLoading}
                                columnDefs={this.colDef}
                                rowData={gridItems.sort(sortLockGroups) || []}
                                returnApi={this.getGridApi}
                                showQuickFilter={true}
                                small={true}
                            />
                        )}
                    </ReactCSSTransitionGroup>
                </Boundary>
                <ReactCSSTransitionGroup
                    transitionName="expand"
                    transitionAppear={true}
                    transitionAppearTimeout={100}
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}
                >
                    {visit.lockGroups && visit.lockGroups.length ? (
                        <Boundary>
                            <RoomsContainer>
                                <CardContainer
                                    items={visit.lockGroups}
                                    type="rooms"
                                    removeItemFn={this.removeAccess}
                                />
                            </RoomsContainer>
                        </Boundary>
                    ) : null}
                </ReactCSSTransitionGroup>
                <Boundary>
                    <ActionsBar>
                        {isFromViewDetail ? (
                            <Button
                                className={'manage-tags-panel-done-button'}
                                variant="contained"
                                onClick={this.done}
                            >
                                <KeyboardArrowLeftIcon />
                                Back
                            </Button>
                        ) : (
                            <Fragment>
                                <div>&nbsp;</div>
                                <ButtonsContainer>
                                    <Button
                                        className={
                                            'manage-tags-panel-manage-tags-button'
                                        }
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            this.store.routing.goToPage(
                                                `/profile/${
                                                    this.store.profiles.item.id
                                                }/visit/${
                                                    this.store.visits.item.id
                                                }/access/tags`
                                            )
                                        }
                                    >
                                        Next
                                        <KeyboardArrowRightIcon />
                                    </Button>
                                </ButtonsContainer>
                            </Fragment>
                        )}
                    </ActionsBar>
                </Boundary>
            </Wrapper>
        )
    }
}
