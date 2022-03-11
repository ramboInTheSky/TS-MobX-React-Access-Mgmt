import { Routing } from '../Routing'

export class RoutingMock extends Routing {
    public goToPage: any = jest.fn()
    public goBackToPage: any = jest.fn()
    public push: any = jest.fn()
    public replace: any = jest.fn()
    public go: any = jest.fn()
    public goBack: any = jest.fn()
    public goForward: any = jest.fn()
    public breadcrumb: any[] = [{ page: 'profile', id: '123-123-123' }]
    public location: any = {}
    public history: any = {}
    public getBreadcrumb: any = jest.fn(() => this.breadcrumb)
    public resizeBreadcrumb: any = jest.fn()
    public resizeBreadcrumbs: any = jest.fn()
    public splitThings: any = jest.fn()
    public rebuildBreadcrumb: any = jest.fn()
}
