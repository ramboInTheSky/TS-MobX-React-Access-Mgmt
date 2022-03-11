import React from 'react'
import * as Sentry from '@sentry/browser'

export class Boundary extends React.Component {
    public state = { hasError: false }

    public componentDidCatch(error: Error) {
        this.setState({ hasError: true })
        Sentry.captureMessage('componentDidCatch')
        Sentry.captureException(error)
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <h1>
                    Something went wrong with this component, our team has
                    already been notified
                </h1>
            )
        }
        return this.props.children
    }
}

export default Boundary
