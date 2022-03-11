export * from './RoutingMock'
export * from './ProfilesMock'
export * from './VisitsMock'
export * from './AuthMock'
export * from './NotificationMock'

export const mockDateConstructor = () => {
    const now = new Date('2020')
    /*eslint no-global-assign:off*/
    Date = class extends Date {
        constructor() {
            super()
            return now
        }
    } as DateConstructor
}
