import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, RouteProps } from 'react-router-dom'
import { AuthStore, StoreNames, Routing } from '../../stores'
import Loader from 'react-loader'
import opts from '../../constants/auth'

export interface ProtectedRouteProps extends RouteProps {
    component: any
    redirectTo?: string
}

export interface ProtectedRouteConnectedProps extends ProtectedRouteProps {
    auth: AuthStore
    routing: Routing
}

@inject(StoreNames.auth, StoreNames.routing)
@observer
export class ProtectedRoute extends Component<ProtectedRouteProps> {
    private redirected: boolean = false
    private isCode: boolean = false
    get store() {
        return this.props as ProtectedRouteConnectedProps
    }

    constructor(props: ProtectedRouteProps){
        super(props)
        this.isCode = opts.AUTH0_RESPONSE_TYPE.indexOf('code') !== -1
    }

    public componentDidMount() {
        if (this.isCode) {
            const { user } = this.store.auth
            if (!user) {
                this.store.auth.login()
            }
        } else {
            this.checkUser()
        }
    }

    // only for implicit flow
    public async checkUser() {
        if (!this.store.auth.user) {
            // tslint:disable-next-line: no-string-literal
            const user = await this.store.auth['getUser']()
            if (!user) {
                setTimeout(this.store.auth.login, 500)
            }
        }
    }

    public render() {
        const { user, redirectToPage } = this.store.auth
        const { goToPage } = this.store.routing
        if (this.isCode) {
            if (user && redirectToPage && !this.redirected) {
                this.redirected = true
                goToPage(redirectToPage)
            }
        }
        // tslint:disable-next-line: no-shadowed-variable
        const { component: Component, redirectTo, ...rest } = this.props as any
        console.debug('will redirect to: ', redirectToPage)
        return (
            <Route
                {...rest}
                render={props => {
                    if (user) {
                        window.location.hash = ''
                        return <Component {...props} />
                    }
                    return <Loader loaded={true} />
                }}
            />
        )
    }
}

export default ProtectedRoute
