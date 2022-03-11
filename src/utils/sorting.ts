import { LockGroup } from '../models/LockGroups'

export const sortLockGroups = (a: LockGroup, b: LockGroup) => {
    const first = a.name
    const last = b.name
    if (first < last) return -1
    if (last < first) return 1
    return 0
}
