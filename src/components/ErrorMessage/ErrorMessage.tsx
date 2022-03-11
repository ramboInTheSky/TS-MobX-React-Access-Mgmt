import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Wrapper } from './Components'
import { StoreNames, Routing, VisitStore } from '../../stores'

export interface ErrorMessageProps {
    children?: string
}
export interface ErrorMessageConnectedProps extends ErrorMessageProps {
    visit: VisitStore,
    routing: Routing
}
@inject(StoreNames.routing)
@observer
export class ErrorMessage extends React.Component<ErrorMessageProps> {
    get store() {
        return this.props as ErrorMessageConnectedProps
    }
    public render() {
        const onClick = () => {
            this.store.routing.goToPage('/')
        }
        return (
            <Wrapper>
                <h3>Something has gone wrong!</h3>
                {this.props.children}
                <br />
                <br />
                <Link to="/" onClick={onClick}>
                    Go back to home page
                </Link>
            </Wrapper>
        )
    }
}
