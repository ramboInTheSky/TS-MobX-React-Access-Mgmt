import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import AddIcon from '@material-ui/icons/Add'
// import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Loader from 'react-loader'

import { Layout, Grid, Search } from '../../components/'
import { ProfileStore, StoreNames, NotificationStore } from '../../stores'
import {
    ActionBar,
    Action,
    SearchWrapper,
    Title,
} from './Components'
import { Routing } from '../../stores/Routing'

// internal props
export interface ProfilesProps {}
// MobX props
interface ProfilesConnectedProps extends ProfilesProps {
    profiles: ProfileStore
    routing: Routing
    notifications: NotificationStore
}
// intersection of all props

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.notifications)
@observer
export class Profiles extends Component<ProfilesProps> {
    get store() {
        return this.props as ProfilesConnectedProps
    }
    public colDef = [
        {
            headerName: 'Name',
            field: 'fullName',
            minWidth: 70,
        },
        {
            headerName: 'Type',
            width: 70,
            field: 'type',
        },
        {
            headerName: 'Created',
            minWidth: 110,
            width: 120,
            field: 'created',
            cellRenderer: (row: any) =>
                new Date(row.value).toLocaleDateString(),
        },
        {
            headerName: 'Email',
            minWidth: 250,
            field: 'emailAddress',
        },
        {
            headerName: 'Phone',
            minWidth: 120,
            field: 'mobileNumber',
        },
        {
            headerName: 'Company',
            minWidth: 70,
            field: 'company',
        },
        {
            headerName: 'Notes',
            minWidth: 70,
            field: 'notes',
        },
        {
            headerName: 'Visits',
            width: 90,
            minWidth: 90,
            field: 'visits',
            cellRenderer: (row: any) => row.value.length,
        },
        // {
        // 	headerName: 'Actions',
        // 	width: 70,
        // 	field: 'id',
        // 	cellRendererFramework: (row: any) => (
        // 		<ActionIcon
        // 			aria-label="Edit Profile"
        // 			title="Edit Profile"
        // 			onClick={() => this.goToDetail(row.value, true)}
        // 		>
        // 			<EditIcon data-title="Edit Profile" />
        // 		</ActionIcon>
        // 	),
        // },
    ]
    constructor(props: ProfilesProps) {
        super(props)
    }
    public componentDidMount() {
        this.store.profiles.getList()
    }

    public goToDetail = (id: string, edit?: boolean) => {
        this.store.profiles.toggleEditing(edit)
        this.store.routing.goToPage(`/profile/${id}`)
    }

    public onChange = (e: any, val?: string) => {
        const {
            target: { value },
        } = e
        this.store.profiles.getList(val || value)
    }

    public render() {
        // const data = this.store.profiles.getItems()
        const { isLoading, isError, errorMessage, items } = this.store.profiles
        if (isError) {
            this.triggerNotification(errorMessage)
        }
        return (
            <Layout>
                <Title>Profiles</Title>
                    <Fragment>
                        <ActionBar>
                            <SearchWrapper>
                                <Search onChange={this.onChange} />
                            </SearchWrapper>
                            <Action
                                id="add-profile-button"
                                aria-label="Add Profile"
                                title="Add Profile"
                                onClick={() => this.goToDetail('new', true)}
                            >
                                <Button variant="contained" color="primary">
                                    <AddIcon />
                                    &nbsp;Add Profile
                                </Button>
                            </Action>
                        </ActionBar>
                        <Loader loaded={!isLoading}>
                            <Grid
                                loading={isLoading}
                                columnDefs={this.colDef}
                                rowData={isLoading ? [] : items}
                                onRowClicked={row =>
                                    this.goToDetail(row.data.id, false)
                                }
                            />
                        </Loader>
                    </Fragment>
            </Layout>
        )
    }

    private triggerNotification(errorMessage: string) {
        this.store.notifications.setNotification('error', errorMessage)
    }
}
