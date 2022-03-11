import { Visit } from './Visit'

export type ProfileType = 'visitor' | 'member'

export class Profile {
    public id: string = ''
    public fullName?: string = undefined
    public firstName: string = ''
    public lastName: string = ''
    public company?: string = undefined
    public mobileNumber?: string = ''
    public emailAddress?: string = ''
    public notes?: string = undefined
    public created?: string = undefined
    public type?: ProfileType = undefined
    public visits?: Visit[] = undefined
    public numberOfTags?: number
    public isStaff: boolean = false
}

export class CreateProfile {
    public firstName: string = ''
    public lastName: string = ''
    public company?: string = undefined
    public mobileNumber?: string = ''
    public emailAddress?: string = ''
    public notes?: string = undefined
    public type?: ProfileType = undefined
}

export class EditProfile {
    public id?: string = undefined
    public firstName: string = ''
    public lastName: string = ''
    public company?: string = undefined
    public mobileNumber?: string = ''
    public emailAddress?: string = ''
    public notes?: string = undefined
    public created?: string = undefined
    public type?: ProfileType = undefined
}

export interface ProfileResponse {
    count: number
    filters: string[]
    items: Profile[]
}
