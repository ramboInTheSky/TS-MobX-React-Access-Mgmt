import { observable, action } from 'mobx'
import { Store } from './APIStore'
import { LockGroup } from '../models/LockGroups'
import urls from '../constants/urls'

// const sortingFn = (a: LockGroup, b: LockGroup) => {
//     const first = a.name
//     const last = b.name
//     if (first > last) return -1
//     if (last > first) return 1
//     return 0
// }

export class LockGroupStore extends Store<LockGroup> {
    @observable
    public selectedLockGroups: LockGroup[] = []

    constructor() {
        super(urls.lockGroups)
    }

    public async getList(filter?: string) {
        const data = await super.getList(undefined, filter)
        this.data = data && data.items ? data.items : []
    }

    @action
    public setList(newList: LockGroup[]) {
        this.data = newList
    }
}
