import { LockGroup } from './LockGroups'
export class Visit {
    public id: string = ''
    public lockGroups?: Array<LockGroup | string> = []
    public fromDate: string = ''
    public toDate: string = ''
    public tagNumbers: string[] = []
    // TODO unify these two properties after CSI-523
    public archetypeIds: string[] = []
    public archetypes?: Archetype[] = []
}

export class CreateVisit {
    public lockGroups?: LockGroup[] = []
    public fromDate: string = ''
    public toDate: string = ''
    public tagNumbers: string[] = []
    public archetypeIds: string[] = []
}

export interface Archetype {
    id: string
    name: string
    primary: boolean
    lockGroupNames: string[]
}

export class Archetypes {
    public primary: Archetype[] = []
    public secondary: Archetype[] = []
}
