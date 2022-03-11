import React from 'react'
import Loader from 'react-loader'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import {
    Wrapper,
    Header,
    Content,
    Item,
    MenuHeader,
    HeaderButton,
    NoItemsMessage,
} from './Components'
import { variables } from '../../constants/theme'
import { Menu, MenuItem } from '@material-ui/core'
import { LockGroup } from '../../models/LockGroups'

export interface CardContainerProps {
    type: 'rooms' | 'tags'
    items?: Array<string | LockGroup>
    removeItemFn?: Function
    button?: { title: string; fn: () => void }
}

export interface CardContainerState {
    menuOpen: { [key: string]: boolean }
    isLoading: { [key: string]: boolean }
}

export class CardContainer extends React.Component<
    CardContainerProps,
    CardContainerState
> {
    constructor(props: CardContainerProps) {
        super(props)
        this.state = {
            menuOpen: {},
            isLoading: {},
        }
    }

    public initializeItems() {
        const obj = {}
        if (this.props.items) {
            this.props.items.forEach((item: any) => {
                obj[item.name || item] = false
            })
            return obj
        }
        return {}
    }

    public componentDidMount() {
        const tempObj = this.initializeItems()
        this.setState({ menuOpen: tempObj, isLoading: tempObj })
    }

    public toggleMenu = (e: any, item: string) =>
        this.setState({
            menuOpen: {
                ...this.state.menuOpen,
                [item]: !this.state.menuOpen[item],
            },
        })

    public removeItem = async (e: any, item: any) => {
        this.setState({
            isLoading: { ...this.state.isLoading, [item]: true },
            menuOpen: {
                ...this.state.menuOpen,
                [item]: !this.state.menuOpen[item],
            },
        })
        if (this.props.removeItemFn) {
            await this.props.removeItemFn(e, item)
            this.setState({
                isLoading: { ...this.state.isLoading, [item]: false },
            })
        }
    }

    public render() {
        const { items, type, button } = this.props
        const { menuOpen, isLoading } = this.state
        return items ? (
            <Wrapper>
                <Header
                    style={{
                        backgroundColor: `${
                            type === 'tags'
                                ? variables.tagColor
                                : variables.roomColor
                        }`,
                    }}
                >
                    {type.toUpperCase()}
                    {button && (
                        <HeaderButton
                            style={{ backgroundColor: 'transparent' }}
                            className={`detail-panel-manage-button-${
                                button.title
                            }`}
                            variant="contained"
                            color="default"
                            onClick={button.fn}
                        >
                            <EditIcon />
                            {/* {button.title} */}
                        </HeaderButton>
                    )}
                </Header>
                <Content>
                    {items.length ? (
                        (items as any).map((_item: any, i: number) => {
                            const item = _item.id || _item
                            const key = `${type}-anchor-${item.replace(
                                / /g,
                                '-'
                            )}`
                            return (
                                <div key={key} id={key}>
                                    {isLoading[item] ? (
                                        <Loader loaded={!isLoading[item]} />
                                    ) : (
                                        <Item key={item}>
                                            <div>
                                                {this.props.removeItemFn ? (
                                                    <span
                                                        className={`delete-icon-for-${item}`}
                                                        onClick={(e: any) =>
                                                            this.toggleMenu(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </span>
                                                ) : (
                                                    <span />
                                                )}
                                            </div>
                                            <div>
                                                {type === 'tags' ? (
                                                    <VpnKeyIcon />
                                                ) : (
                                                    <MeetingRoomIcon />
                                                )}
                                                {_item.name || item}
                                            </div>
                                        </Item>
                                    )}

                                    <Menu
                                        anchorEl={
                                            document.querySelector(
                                                `#${key}`
                                            ) as any
                                        }
                                        aria-label="Settings"
                                        id="Settings"
                                        title="Settings"
                                        open={menuOpen[item] || false}
                                        onClose={(e: any) =>
                                            this.toggleMenu(e, item)
                                        }
                                    >
                                        <MenuHeader>
                                            Delete{' '}
                                            <span>
                                                {type === 'tags'
                                                    ? 'Tag: '
                                                    : 'Room: '}
                                                {_item.name || item}
                                            </span>
                                        </MenuHeader>
                                        <MenuItem
                                            onClick={(e: any) =>
                                                this.removeItem(e, item)
                                            }
                                        >
                                            Yes
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e: any) =>
                                                this.toggleMenu(e, item)
                                            }
                                        >
                                            Cancel
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )
                        })
                    ) : (
                        <NoItemsMessage>{`No ${type} to display`}</NoItemsMessage>
                    )}
                </Content>
            </Wrapper>
        ) : (
            <div />
        )
    }
}
