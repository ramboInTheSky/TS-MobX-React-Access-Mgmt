import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Boundary } from '../../components'
import {
    Wrapper,
    Entry,
    Dates,
    Divider,
    Access,
    DatesContainer,
    Status,
    AccessContainer,
} from './Components'
import { Visit } from '../../models/Visit'
import { getDateTimeString } from '../../utils'
import { StoreNames, ProfileStore, Routing } from '../../stores'

export interface VisitsPanelProps {
    visits?: Visit[]
}

export interface VisitsPanelConnectedProps extends VisitsPanelProps {
    profiles: ProfileStore
    routing: Routing
}

@inject(StoreNames.profiles, StoreNames.routing)
@observer
export class VisitsPanel extends Component<VisitsPanelProps> {
    get store() {
        return this.props as VisitsPanelConnectedProps
    }
    constructor(props: VisitsPanelProps) {
        super(props)
    }

    public goToVisit = (id: string) => {
        this.store.routing.goToPage(
            `/profile/${this.store.profiles.item.id}/visit/${id}`
        )
    }

    public render() {
        const { visits } = this.props

        return (
            <Boundary>
                <Wrapper>
                    {visits &&
                        visits.map(visit => {
                            const today = new Date()
                            const isActive =
                                (!visit.toDate ||
                                    new Date(visit.toDate) > today) &&
                                new Date(visit.fromDate) < today
                            return (
                                <ReactCSSTransitionGroup
                                    key={visit.fromDate + visit.toDate}
                                    transitionName="expand"
                                    transitionAppear={true}
                                    transitionAppearTimeout={200}
                                    transitionEnterTimeout={200}
                                    transitionLeaveTimeout={200}
                                >
                                    <Entry
                                        onClick={() => this.goToVisit(visit.id)}
                                        style={{ opacity: isActive ? 1 : 0.6 }}
                                    >
                                        <AccessContainer>
                                            <DatesContainer>
                                                <Dates className="date-from">
                                                    {getDateTimeString(
                                                        visit.fromDate
                                                    )}
                                                </Dates>
                                                <Divider>
                                                    <ArrowForwardIcon />
                                                </Divider>
                                                <Dates className="date-to">
                                                    {getDateTimeString(
                                                        visit.toDate
                                                    )}
                                                </Dates>
                                            </DatesContainer>
                                            <Access>
                                                {visit.lockGroups &&
                                                visit.lockGroups.length
                                                    ? visit.lockGroups.join(
                                                          ', '
                                                      )
                                                    : 'No access granted'}
                                            </Access>
                                        </AccessContainer>
                                        <Status>
                                            {isActive ? 'Active' : 'Inactive'}
                                        </Status>
                                    </Entry>
                                </ReactCSSTransitionGroup>
                            )
                        })}
                </Wrapper>
            </Boundary>
        )
    }
}
