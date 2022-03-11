import React, { Component } from 'react'
import { Router, Switch } from 'react-router-dom'
import { ProtectedRoute } from './containers/ProtectedRoute'
import { createBrowserHistory, History } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'
import * as Sentry from '@sentry/browser'
import { StylesProvider } from '@material-ui/styles'

Sentry.init({
    dsn: 'https://7411d081b8864876b42b08a924a4e0df@sentry.io/1454297',
    environment: window.location.hostname.toString(),
    beforeSend(event) {
        if (window.location.hostname.includes('localhost')) {
            console.log('event not dispatched: ', event)
            return null
        }
        return event
    },
})

import {
    Profiles,
    ProfileDetail,
    VisitDetail,
    ManageTags,
    ManageCustomAccess,
} from './routes'
import { stores } from './stores'

class App extends Component {
    public browserHistory: History
    public mobxSyncedHistory: any
    constructor(props: any) {
        super(props)
        this.browserHistory = createBrowserHistory()
        this.mobxSyncedHistory = syncHistoryWithStore(
            this.browserHistory,
            stores.routing!
        )
    }
    public render() {
        return (
            <Provider {...stores}>
                <StylesProvider injectFirst={true}>
                    <Router history={this.mobxSyncedHistory}>
                        <Switch>
                            <ProtectedRoute
                                path="/"
                                exact={true}
                                component={Profiles}
                            />
                            <ProtectedRoute
                                path="/profile/:profileId?"
                                exact={true}
                                component={ProfileDetail}
                            />
                            <ProtectedRoute
                                path="/profile/:profileId/visit/:visitId?"
                                exact={true}
                                component={VisitDetail}
                            />
                            <ProtectedRoute
                                path="/profile/:profileId/visit/:visitId/access"
                                exact={true}
                                component={ManageCustomAccess}
                            />
                            <ProtectedRoute
                                path="/profile/:profileId/visit/:visitId/access/tags"
                                exact={true}
                                component={ManageTags}
                            />
                            <ProtectedRoute
                                path="/profile/:profileId/visit/:visitId/tags"
                                exact={true}
                                component={ManageTags}
                            />
                        </Switch>
                    </Router>
                </StylesProvider>
            </Provider>
        )
    }
}

export default App
