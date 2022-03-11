export class LockGroup {
    public id: string = ''
    public name: string = ''
    public type: string = ''
    public notes: string = ''
    public selected: boolean = false
    constructor(id?: string, name?: string, type?: string) {
        this.id = id || ''
        this.name = name || ''
        this.type = type || 'Room'
    }
}

export class CreateLockGroup {
    public name: string = ''
    public type: string = ''
    public notes: string = ''
}

export interface LockGroupResponse {
    count: number
    filters: string[]
    items: LockGroup[]
}
