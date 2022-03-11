import React, { Component, Fragment } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import { observer, inject } from 'mobx-react'

import { Boundary } from '../ErrorBoundary'
import logo from '../../assets/logo_dark_vertical.png'
import { Wrapper, Logo, Title, MenuButton } from './Components'
import { MenuItem, Menu } from '@material-ui/core'
import { uiBuildNumber } from '../../constants/api_versions'
import { AuthStore, StoreNames } from '../../stores'
// tslint:disable-next-line: no-var-requires
const version = require('../../../package.json').version

export interface HeaderProps {}

export interface HeaderConnectedProps extends HeaderProps {
    auth: AuthStore
}

export interface HeaderState {
    settingsMenu?: boolean
    userMenu?: boolean
}
@inject(StoreNames.auth)
@observer
export class Header extends Component<HeaderProps, HeaderState> {
    get store() {
        return this.props as HeaderConnectedProps
    }

    public state = {
        settingsMenu: false,
        userMenu: false,
    }

    public toggleMenu = (menu: string) => this.setState({ [menu]: !this.state[menu] })

    public render() {
        const { settingsMenu, userMenu } = this.state
        const { logout, user } = this.store.auth
        return (
            <Boundary>
                <Wrapper>
                    <Logo src={logo} alt="The Collective" />
                    <Title>ROOST</Title>
                    <div>
                        {user && (
                            <Fragment>
                                <MenuButton
                                    id="anchor-000"
                                    aria-owns={'User'}
                                    aria-haspopup="true"
                                    onClick={() => this.toggleMenu('userMenu')}
                                >
                                    <PersonIcon />
                                </MenuButton>
                                {user.name}
                                <Menu
                                    anchorEl={
                                        document.querySelector(
                                            '#anchor-000'
                                        ) as any
                                    }
                                    aria-label="User"
                                    id="User"
                                    title="User"
                                    open={userMenu}
                                    onClose={() => this.toggleMenu('userMenu')}
                                >
                                    <MenuItem
                                        id={'logout-menu-item'}
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Fragment>
                        )}
                        <Fragment>
                            <MenuButton
                                id="anchor-001"
                                aria-owns={'Settings'}
                                aria-haspopup="true"
                                onClick={() => this.toggleMenu('settingsMenu')}
                            >
                                <SettingsIcon />
                            </MenuButton>
                            <Menu
                                anchorEl={
                                    document.querySelector('#anchor-001') as any
                                }
                                aria-label="Settings"
                                id="Settings"
                                title="Settings"
                                open={settingsMenu}
                                onClose={() => this.toggleMenu('settingsMenu')}
                            >
                                <MenuItem
                                    onClick={() =>
                                        this.toggleMenu('settingsMenu')
                                    }
                                >
                                    UI version: {version}
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        this.toggleMenu('settingsMenu')
                                    }
                                >
                                    Build number: {uiBuildNumber}
                                </MenuItem>
                            </Menu>
                        </Fragment>
                    </div>
                </Wrapper>
            </Boundary>
        )
    }
}
