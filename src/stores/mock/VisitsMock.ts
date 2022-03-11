import { Archetype, Visit } from '../../models/Visit'
import { Tag } from '../../models/Tag'

export class VisitsMock {
    public archetypes: {
        primary: Archetype[]
        secondary: Archetype[]
    } = {
        primary: [
            {
                id: '111-111-111',
                lockGroupNames: ['door1', 'door2'],
                name: 'Functional API Tests',
                primary: false,
            },
        ],
        secondary: [],
    }
    public getArchetypes: Function = jest.fn()
    public item: Visit = new Visit()
    public detail: any = {
        id: 'd8be7c8d-a89f-4632-b71e-2d756463643c',
        from_date: '2019-05-30T13:44:43.463Z',
        to_date: null,
        tag_numbers: ['00123123'],
        archetype_ids: ['d8be7c8d-a89f-4632-b71e-2d756463643c'],
    }
    public getDetail: Function = jest.fn(() => this.detail)
    public poll: Function = jest.fn(() => null)
    public addTag = jest.fn((tag: Tag, profileId: string, visitId: string) => {
        this.detail.tagNumbers.push(tag.tagNumber!)
    })
    public removeTag = jest.fn()
    public clearErrors = jest.fn()
    public addAccess = jest.fn()
    public removeAccess = jest.fn()
    public save = jest.fn()
    public validationError?: string = undefined
    public toggleEditing = jest.fn()
    public simulateValidationError = () =>
        (this.validationError = 'this is an error')
}
