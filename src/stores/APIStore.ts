import { observable, action, toJS } from 'mobx'
import axios from './axios'

import { getErrorCode, toSnakeCase, toCamelCase } from '../utils'

export { observable, action }

export class Store<T> {
    // public API
    // public getItems = (): Array<T> => {
    // 	return toJS(this.data) as Array<T>
    // }

    public get items(): T[] {
        return toJS(this.data) as T[]
    }

    public get item(): T {
        return toJS(this.detail) as T
    }

    // public getItem = (): T => {
    // 	return toJS(this.detail) as T
    // }

    public get errorMessage(): string {
        return this.error as string
    }

    public get isLoading(): boolean {
        return this.loading
    }

    public get isError(): boolean {
        return !!this.error
    }

    @observable public error?: string = undefined
    protected url: string

    @observable protected data: T[] = []

    @observable protected detail: T | Partial<T> = {}

    @observable protected count: number = 0

    @observable protected loading: boolean = false
    private fresh = false

    constructor(uri: string) {
        this.url = uri
    }

    public isFresh = () => this.fresh

    @action
    public async getList(url?: string, filter?: string, errorMessage?: string) {
        if (!this.url && !url) return
        try {
            this.loading = true
            let res: any
            res = await axios.get(url || `${this.url}?filter=${filter}`)
            this.apiEnded()
            this.count = res.data && res.data.count ? res.data.count : 0
            return toCamelCase(res.data)
        } catch (e) {
            this.apiEnded(e, errorMessage ? errorMessage : undefined)
            this.count = 0
            return []
        }
    }

    @action
    public async getDetail(item: string, url?: string) {
        try {
            this.detail = {}
            this.loading = true
            let res: any
            res = await axios.get(url || `${this.url}/${item}`)
            this.apiEnded()
            return toCamelCase(res.data)
        } catch (e) {
            this.apiEnded(e)
            return {}
        }
    }

    @action
    public async save(item: Partial<T>, id?: string, url?: string) {
        try {
            this.loading = true
            let res: any
            if (id) {
                res = await axios.put(
                    `${url || this.url}/${id}`,
                    toSnakeCase(item)
                )
            } else {
                res = await axios.post(url || this.url, toSnakeCase(item))
            }
            this.apiEnded()
            return toCamelCase(res.data)
        } catch (e) {
            this.apiEnded(e)
            return null
        }
    }
    // end public API

    protected apiEnded = (e?: any, customMessage?: string) => {
        if ((this as any).polling) {
            ;(this as any).polling = false
        }
        this.loading = false
        this.error = e ? customMessage || getErrorCode(e) : undefined
        this.fresh = true
        // tslint:disable-next-line: no-this-assignment
        const self = this
        // tslint:disable-next-line: ter-prefer-arrow-callback
        setTimeout(() => {
            self.fresh = false
        })
    }
}
