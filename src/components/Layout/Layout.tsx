import React from 'react'
import { observer, inject } from 'mobx-react'
import { Boundary } from '../ErrorBoundary'
import { Header } from '../Header'
import { Wrapper, Heading, Content } from './Components'
import { Breadcrumb, SnackbarComponent } from '../'
import { StoreNames, AuthStore } from '../../stores'
import {debounce} from '../../utils/authUtils'


export interface LayoutProps {
    children?: any
}

export interface LayoutConnectedProps extends LayoutProps {
    auth: AuthStore
}

@inject(StoreNames.auth)
@observer
export class Layout extends React.Component<LayoutProps> {
    get store() {
        return this.props as LayoutConnectedProps
    }

    constructor(props: LayoutProps){
        super(props)
        this.resetTimer = debounce(this.resetTimer, 1000)
    }

    public resetTimer() {this.store.auth.resetTimer()}
    public render() {
        return (
            <Boundary>
                <Wrapper
                    onClick={()=>this.resetTimer()}
                    onScroll={()=>this.resetTimer()}
                    onKeyDown={()=>this.resetTimer()}
                >
                    <Heading>
                        <Header />
                        <Breadcrumb />
                    </Heading>
                    <SnackbarComponent/>
                    <Content>{this.props.children}</Content>
                </Wrapper>
            </Boundary>
        )
    }
}
