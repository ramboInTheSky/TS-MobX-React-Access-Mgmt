// first party
import { ProfileStore } from './Profiles'
import { Routing } from './Routing'
import { VisitStore } from './Visits'
import { LockGroupStore } from './LockGroups'
import { AuthStore } from './Auth.Code.Grant'
import { NotificationStore } from './Notifications'

// re-exports
export * from './Profiles'
export * from './Routing'
export * from './Visits'
export * from './LockGroups'
export * from './Auth.Code.Grant'
export * from './Notifications'

export interface Stores {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    lockGroups: LockGroupStore
    auth: AuthStore
    notifications: NotificationStore
}

type StoreNamesGuard = keyof Stores

export class StoreNames {
    public static profiles: StoreNamesGuard = 'profiles'
    public static notifications: StoreNamesGuard = 'notifications'
    public static routing: StoreNamesGuard = 'routing'
    public static visits: StoreNamesGuard = 'visits'
    public static lockGroups: StoreNamesGuard = 'lockGroups'
    public static auth: StoreNamesGuard = 'auth'
}

const localStores: Partial<Stores> = {
    profiles: new ProfileStore(),
    routing: new Routing(),
    visits: new VisitStore(),
    lockGroups: new LockGroupStore(),
    auth: new AuthStore(),
    notifications: new NotificationStore(),
}

// test comment
export const stores = { ...localStores }
