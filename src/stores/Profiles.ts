import { observable, action } from 'mobx'
import { oc } from 'ts-optchain'
import { Store } from './APIStore'
import { Profile, CreateProfile, EditProfile } from '../models/Profile'
import urls from '../constants/urls'
import { Visit } from '../models/Visit'

const sortingFn = (a: Visit, b: Visit) => {
    const first = new Date(a.toDate)
    const last = new Date(b.toDate)
    if (first > last) return -1
    if (last > first) return 1
    return 0
}

export class ProfileStore extends Store<Profile> {
    public get editing() {
        return this.edit
    }

    @observable protected edit: boolean = false

    constructor() {
        super(urls.profiles)
    }

    @action
    public toggleEditing(editing?: boolean) {
        if (editing !== undefined) {
            this.edit = editing
        } else this.edit = !this.edit
    }

    public async getList(filter?: string) {
        const data = await super.getList(undefined, filter, 'Unable to show profiles at this time')
        this.data = oc(data)
            .items([])
            .map((item: Profile) => {
                item.fullName = `${item.firstName} ${item.lastName}`
                return item
            })
            // support for number of tags per profile
            // .map((item: Profile) =>{
            //     item.numberOfTags = oc(item).visits([]).filter((visit: Visit)=>{
            //         return visit.tagNumbers.length
            //     }).length

            //     console.log('item.numberOfTags: ', item.numberOfTags)
            //     console.dir(item)
            //     return item
            // })
    }

    public async getDetail(profileId: string) {
        if (profileId !== 'new') {
            const data = await super.getDetail(profileId)
            if (data) {
                const item: Profile = {
                    ...data,
                    fullName: `${data.firstName} ${data.lastName}`,
                }
                if (item.visits && item.visits.length) {
                    item.visits.sort(sortingFn)
                }

                this.detail = item
                return
            }
            this.detail = new Profile()
        }
        this.detail = new Profile()
    }

    public async save(item: Profile, id?: string) {
        const payload = Object.assign(
            id ? new EditProfile() : new CreateProfile(),
            item
        )
        this.detail = {}
        const data = await super.save(payload, id)
        this.edit = false
        this.detail = data
    }
}
