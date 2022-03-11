import React from 'react'
import Loader from 'react-loader'
import { ProfileStore } from '../../stores/Profiles'
import { Routing, StoreNames } from '../../stores'
import { VisitStore } from '../../stores/Visits'
import { inject, observer } from 'mobx-react'
import { Tag } from '../../models/Tag'
import { ManageTagsPanel } from '../../containers/ManageTagsPanel'
import { Layout, Boundary, ErrorMessage } from '../../components'

export interface ManageTagsProps {
    match: {
        params: {
            profileId: string
            visitId: string
        }
    }
}

export interface ManageTagsConnectedProps extends ManageTagsProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}
@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class ManageTags extends React.Component<ManageTagsProps> {
    get store() {
        return this.props as ManageTagsConnectedProps
    }
    public lastUsedTag?: string = undefined
    constructor(props: ManageTagsProps) {
        super(props)
    }

    public componentDidMount() {
        if (!this.store.profiles.item.id) {
            this.store.profiles.getDetail(this.props.match.params.profileId)
        }
        if (!this.store.visits.item.id) {
            this.store.visits.getDetail(
                this.props.match.params.profileId,
                this.props.match.params.visitId
            )
        }
    }

    public save = async (data: Tag) => {
        await this.store.visits.addTag(
            data,
            this.props.match.params.profileId,
            this.props.match.params.visitId
        )
    }

    public addTag = async (tag: Tag) => {
        return await this.store.visits.addTag(
            tag,
            this.store.profiles.item.id!,
            this.store.visits.item.id
        )
    }

    public removeTag = async (id: string) => {
        await this.store.visits.removeTag(
            id,
            this.store.profiles.item.id!,
            this.store.visits.item.id
        )
    }

    public render() {
        const { isError, isLoading, errorMessage } = this.store.visits
        if (isError) return <ErrorMessage>{errorMessage}</ErrorMessage>
        if (isLoading) {
            return <Loader loaded={!isLoading} />
        }
        return (
            <Layout>
                <Boundary>
                    <ManageTagsPanel
                        addTag={this.addTag}
                        removeTag={this.removeTag}
                    />
                </Boundary>
            </Layout>
        )
    }
}
