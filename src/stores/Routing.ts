import { observable, action, toJS } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { isUUID } from 'validator'

export class Routing extends RouterStore {
    @observable protected breadcrumb: Array<{ page: string; id?: string }> = []

    constructor() {
        super()
        this.rebuildBreadcrumb()
    }

    public splitThings(temp: string[]) {
        return temp
            .map((item: string, index: number, arr: string[]) => {
                if (!isUUID(item)) {
                    return {
                        page: item,
                        id:
                            arr[index + 1] && isUUID(arr[index + 1])
                                ? arr[index + 1]
                                : undefined,
                    } as { page: string; id?: string }
                }
                return null
            })
            .filter(item => item) as any
    }

    @action
    public rebuildBreadcrumb = () => {
        const pathname = location.pathname !== '/' ? location.pathname : ''
        const temp = pathname.split('/').splice(1)
        this.breadcrumb = this.splitThings(temp)
    }

    public getBreadcrumb = () => {
        return toJS(this.breadcrumb)
    }

    @action
    public resizeBreadcrumb = () => {
        this.rebuildBreadcrumb()
    }

    @action
    public goToPage = (route: string) => {
        if (route !== '/') {
            const pages = route.split('/').splice(1)
            this.breadcrumb = this.splitThings(pages)
        } else {
            this.breadcrumb = []
        }
        this.push(route)
    }
}
