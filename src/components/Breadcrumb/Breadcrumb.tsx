import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import { observer, inject } from 'mobx-react'
import { Wrapper } from './Components'
import { StoreNames, Routing } from '../../stores'
import { toName } from '../../utils'

export interface BreadcrumbProps {}

export interface BreadcrumbConnectedProps extends BreadcrumbProps {
    routing: Routing
}

@inject(StoreNames.routing)
@observer
export class Breadcrumb extends React.Component<BreadcrumbProps> {
    get store() {
        return this.props as BreadcrumbConnectedProps
    }

    public componentDidMount() {
        this.store.routing.resizeBreadcrumb()
    }

    public buildUri = (index: number) => {
        const { getBreadcrumb } = this.store.routing
        const breadcrumb = getBreadcrumb()
        let url = ''
        for (let i = 0; i <= index; i++) {
            url += `/${breadcrumb[i].page}${
                breadcrumb[i].id ? `/${breadcrumb[i].id}` : ''
            }`
        }
        return url
    }

    public render() {
        const { getBreadcrumb, resizeBreadcrumb } = this.store.routing
        const breadcrumb = getBreadcrumb()
        return breadcrumb.length ? (
            <Wrapper id="breadcrumb-wrapper">
                <Link to={'/'} onClick={() => resizeBreadcrumb()}>
                    <HomeIcon />
                </Link>
                &nbsp;
                {breadcrumb.map((item, i) =>
                    i === breadcrumb.length - 1 ? (
                        `/  ${toName(item.page)}`
                    ) : (
                        <span key={item.page} id="breadcrumb-item">
                            /&nbsp;&nbsp;
                            <Link to={this.buildUri(i)}>
                                {toName(item.page)}
                            </Link>
                            &nbsp;&nbsp;
                        </span>
                    )
                )}
            </Wrapper>
        ) : null
    }
}
