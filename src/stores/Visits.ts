import { observable, action } from 'mobx'
import axios from './axios'
import { oc } from 'ts-optchain'
import { Store } from './APIStore'
import { Visit, CreateVisit, Archetype } from '../models/Visit'
import urls from '../constants/urls'
import { Tag } from '../models/Tag'
import { toSnakeCase, toCamelCase, getErrorCode } from '../utils'
import { LockGroup } from '../models/LockGroups'
import _ from 'lodash'
import { sortLockGroups } from '../utils/sorting'

// const sortingFn = (a: Visit, b: Visit) => {
//     const first = new Date(a.toDate)
//     const last = new Date(b.toDate)
//     if (first > last) return -1
//     if (last > first) return 1
//     return 0
// }

export class VisitStore extends Store<Visit> {
    public get editing() {
        return this.edit
    }

    public get isNew() {
        return this.new
    }

    public set isNew(value: boolean) {
        this.new = value
    }

    public get isTagLoading() {
        return this.tagLoading
    }

    public get isValidationError() {
        return !!this.validationError
    }

    public get validationError() {
        return this.internalValidationError
    }

    public get archetypes() {
        return this.archetypesObj
    }
    @observable protected archetypesObj: {
        primary: Archetype[]
        secondary: Archetype[]
    } = {
        primary: [],
        secondary: [],
    }

    @observable protected edit: boolean = false
    @observable protected roomLoading: { [key: string]: boolean } = {}
    @observable protected tagLoading: boolean = false
    @observable protected polling: boolean = false
    @observable protected internalValidationError?: string = undefined
    @observable protected erroredTag?: string = undefined
    @observable private new: boolean = false

    constructor() {
        super(urls.visits)
    }

    public isRoomLoading(id: string): boolean {
        return !!this.roomLoading[id]
    }

    @action
    public clearErrors = () => {
        this.error = undefined
        this.loading = false
        this.internalValidationError = undefined
        this.erroredTag = undefined
    }

    @action
    public toggleEditing(editing?: boolean) {
        if (editing !== undefined) {
            this.edit = editing
        } else this.edit = !this.edit
    }

    public async getArchetypes() {
        const data = await super.getList(urls.archetypes, undefined, 'Unable to connect to show archetypes. Please refresh page')
        if (oc(data).items()) {
            const primary = data.items.filter((item: Archetype) => item.primary)
            const secondary = data.items.filter(
                (item: Archetype) => !item.primary
            )
            this.archetypesObj = { primary, secondary }
        }
    }

    @action
    public async getDetail(profileId: string, visitId: string) {
        const url = `${urls.profiles}/${profileId}/visit/${visitId}`
        if (visitId !== 'new') {
            const data: Visit = await super.getDetail(visitId, url)
            if (data) {
                const temp = { ...data }
                temp.lockGroups = temp.lockGroups || []
                temp.lockGroups.sort(sortLockGroups as any)
                this.detail = temp
                return
            }
            this.detail = new Visit()
        }
        this.detail = new Visit()
    }

    public async save(item: Visit, profileId: string) {
        this.loading = true
        try {
            const url = `${urls.profiles}/${profileId}/visit`
            const payload = Object.assign(new CreateVisit(), item)
            this.detail = {}
            const data = await super.save(payload, undefined, url)
            if (!_.isEmpty(data)) {
                this.loading = true
                this.detail = data
                return this.poll(url)
            }
            this.edit = false
            this.loading = false
            return null
        } catch (failsafe) {
            this.apiEnded(failsafe)
            return null
        }
    }

    public poll(url: string, interval: number = 1000, timeout: number = 30) {
        const endTime = Number(new Date()) + (timeout || 20) * 1000

        const checkPolling = async (resolve: any, reject: any) => {
            try {
                const result = await axios.get(`${url}/${this.detail.id}/status`)
                if (oc(result).data.finished()) {
                    if (!result.data.error) {
                        this.apiEnded()
                        this.new = true
                    } else {
                        this.apiEnded(result, result.data.error)
                        this.detail = {}
                    }
                    this.loading = false
                    resolve()
                } else if (Number(new Date()) < endTime) {
                    setTimeout(checkPolling, interval, resolve, reject)
                } else {
                    const err = new Error('Unable to connect to Salto')
                    this.apiEnded(err)
                    this.loading = false
                    this.detail = {}
                    reject(err)
                }
            }
            catch (e) {
                this.apiEnded(e)
                this.loading = false
                reject(e)
            }
        }

        return new Promise(checkPolling)
    }

    public async addTag(tag: Tag, profileId: string, visitId: string) {
        const url = `${urls.profiles}/${profileId}/visit/${visitId}/tag`
        let res: any
        try {
            this.tagLoading = true
            res = await axios.post(url, toSnakeCase(tag))
            this.tagLoading = false
            const data = toCamelCase(res.data)
            if (data.success) {
                this.detail.tagNumbers = this.detail.tagNumbers || []
                this.detail.tagNumbers.push(data.tagNumber)
            } else {
                this.apiEnded()
                this.tagLoading = false
                this.erroredTag = data.tagNumber
                this.internalValidationError = getErrorCode(data)
            }
            return data.success
        } catch (error) {
            this.apiEnded()
            this.tagLoading = false
            let data = {}
            if (error.response) {
                data = toCamelCase(error.response.data)
            }
            this.erroredTag = tag.tagNumber!
            this.internalValidationError = getErrorCode(data)
            console.log(data)
            console.log(this.internalValidationError)
            return false
        }
    }

    public async removeTag(id: string, profileId: string, visitId: string) {
        const url = `${urls.profiles}/${profileId}/visit/${visitId}/tag`
        let res: any
        try {
            this.tagLoading = true
            res = await axios.patch(
                url,
                toSnakeCase({
                    tagNumbers: [id],
                })
            )
            this.apiEnded()
            this.tagLoading = false
            const data = toCamelCase(res.data)
            if (data.tagNumbers) {
                const index = this.detail.tagNumbers!.findIndex(
                    item => item === id
                )
                this.detail.tagNumbers!.splice(index, 1)
                this.tagLoading = false
                return true
            }

            return false
        } catch (error) {
            if (error.response) {
                this.apiEnded(toCamelCase(error.response.data))
            } else {
                this.apiEnded(error)
            }
            this.tagLoading = false
            return false
        }
    }

    public async addAccess(
        lockGroup: LockGroup,
        profileId: string,
        visitId: string
    ) {
        const url = `${urls.profiles}/${profileId}/visit/${visitId}/lockgroup`
        let res: any
        try {
            this.roomLoading[lockGroup.id] = true
            res = await axios.post(url, {
                lock_group_id: lockGroup.id,
            })
            const data = toCamelCase(res.data)
            if (data.lockGroupId) {
                this.detail.lockGroups = this.detail.lockGroups || []
                this.detail.lockGroups.push(lockGroup as LockGroup)
                this.roomLoading[lockGroup.id] = false
                return true
            }
            this.roomLoading[lockGroup.id] = false
            return false
        } catch (error) {
            if (error.response) {
                this.apiEnded(toCamelCase(error.response.data))
            } else {
                this.apiEnded(error)
            }
            this.roomLoading[lockGroup.id] = false
            return false
        }
    }

    public async removeAccess(id: string, profileId: string, visitId: string) {
        const url = `${
            urls.profiles
        }/${profileId}/visit/${visitId}/lockgroup/${id}`
        let res: any
        try {
            res = await axios.delete(url)
            const data = toCamelCase(res.data)
            if (data.lockGroupId) {
                const index = this.detail.lockGroups!.findIndex(
                    item => (item as any).id === id
                )
                this.detail.lockGroups!.splice(index, 1)
                return true
            }
            return false
        } catch (error) {
            if (error.response) {
                this.apiEnded(toCamelCase(error.response.data))
            } else {
                this.apiEnded(error)
            }
            return false
        }
    }
}
