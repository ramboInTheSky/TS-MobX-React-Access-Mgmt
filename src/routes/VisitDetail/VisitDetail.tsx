import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import Loader from 'react-loader'

import { Layout, Boundary } from '../../components'
import { ProfileStore, StoreNames, Routing, NotificationStore } from '../../stores'
import { Visit } from '../../models/Visit'
import { VisitStore } from '../../stores/Visits'
import { CreateVisitPanel, ViewVisitPanel } from '../../containers'
import { isEmpty } from 'lodash'

export interface VisitDetailProps {
    match: {
        params: {
            profileId: string
            visitId: string
        }
    }
}

export interface VisitDetailConnectedProps extends VisitDetailProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    notifications: NotificationStore
}

export interface VisitState {
    dateFrom: Date
    dateTo: Date | null
    selectedArchetypes: string[]
    noEndDate: boolean
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits, StoreNames.notifications)
@observer
export class VisitDetail extends Component<VisitDetailProps, VisitState> {

    get store() {
        return this.props as VisitDetailConnectedProps
    }

    constructor(props: VisitDetailProps) {
        super(props)
        this.state = {
            dateFrom: new Date(),
            dateTo: null,
            selectedArchetypes: [],
            noEndDate: false,
        }
        // when(
        //     () => this.store.visits.isError,
        //     () => this.triggerNotification()
        // );
    }

    public componentDidMount() {
        if (!this.store.profiles.item.id) {
            this.store.profiles.getDetail(this.props.match.params.profileId)
        }
        if (this.props.match.params.visitId === 'new') {
            this.store.visits.toggleEditing(true)
        } else {
            this.store.visits.getDetail(
                this.props.match.params.profileId,
                this.props.match.params.visitId
            )
        }
        if (isEmpty(this.store.visits.archetypes.primary)) {
            this.store.visits.getArchetypes()
        }
    }

    public save = async (data: Visit, routeTo?: string) => {
        try {
            await this.store.visits.save(data, this.props.match.params.profileId)
            if (this.store.visits.item.id) {
                this.store.routing.goToPage(
                    `/profile/${this.store.profiles.item.id}/visit/${
                        this.store.visits.item.id
                    }/access`
                )
                this.store.notifications.setNotification('success', 'New visit successfully created')
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    public render() {
        const { isError, isLoading, editing, errorMessage } = this.store.visits
        if (isLoading) {
            return (
                <Fragment>
                    <div
                        style={{
                            position: 'absolute',
                            top: '53%',
                            left: '44%',
                        }}
                        >
                        Please don't refresh this page
                    </div>
                    <Loader loaded={!isLoading} />
                </Fragment>
            )
        }
        if (isError) {
            this.triggerNotification(errorMessage)
        }
        return (
            <Layout>
                <Boundary>
                    {editing ? (
                        <CreateVisitPanel saveFn={this.save} />
                    ) : (
                        <ViewVisitPanel />
                    )}
                </Boundary>
            </Layout>
        )
    }

    private triggerNotification(errorMessage: string) {
        this.store.notifications.setNotification('error', errorMessage)
        this.store.visits.clearErrors()
    }
}
