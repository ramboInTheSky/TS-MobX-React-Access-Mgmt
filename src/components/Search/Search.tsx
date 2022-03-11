import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { Boundary } from '../ErrorBoundary'
import { Container, Input, Action } from './Components'

export interface SearchProps {
    onChange: (e: any, value?: string) => void
    placeholder?: string
}

export interface SearchState {
    value: string
}

export class Search extends React.Component<SearchProps, SearchState> {
    public state: SearchState = { value: '' }
    constructor(props: SearchProps) {
        super(props)
    }

    public clearSelection = () => {
        const { onChange } = this.props
        this.setState({ value: '' }, () => onChange({ target: { value: '' } }))
    }

    public render() {
        const { placeholder, onChange } = this.props
        const { value } = this.state
        return (
            <Boundary>
                <Container elevation={1}>
                    {value && (
                        <Action
                            aria-label="Clear"
                            onClick={this.clearSelection}
                            title="Clear Search">
                            <CloseIcon />
                        </Action>
                    )}
                    <Input
                        placeholder={
                            placeholder ||
                            'Search: name, company, access, key number'
                        }
                        onChange={(e: any) =>
                            this.setState({ value: e.target.value })
                        }
                        value={value}
                        onKeyDown={(e: any) =>
                            (e.keyCode === 13) ? onChange(e, e.target.value) : null
                        }
                    />

                    <Action
                        aria-label="Search"
                        onClick={(e: any) => onChange(e, value)}
                        title="Search"
                    >
                        <SearchIcon />
                    </Action>
                </Container>
            </Boundary>
        )
    }
}
