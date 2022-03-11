import axios from './axios'

import { VisitStore } from './Visits'
import { Visit } from '../models/Visit'
import { LockGroup } from '../models/LockGroups'

jest.mock('axios', () => ({
    get: jest.fn((url: string) =>
        url === 'fail'
            ? Promise.reject({ status: 500 })
            : Promise.resolve({ status: 200, data: { success: true } })
    ),
    post: jest.fn((url: string) =>
        url === 'fail'
            ? Promise.reject({ status: 500 })
            : Promise.resolve({ status: 200, data: { success: true } })
    ),
    patch: jest.fn((url: string) =>
        url === 'fail'
            ? Promise.reject({ status: 500 })
            : Promise.resolve({ status: 200, data: { success: true } })
    ),
    delete: jest.fn((url: string) =>
        url === 'fail'
            ? Promise.reject({ status: 500 })
            : Promise.resolve({ status: 200, data: { success: true } })
    ),
}))

describe('<VisitStore />', () => {
    it('renders correctly', () => {
        const store = new VisitStore()
        expect(store).toMatchSnapshot()
    })
    it('sets isError if API issues', async () => {
        const store = new VisitStore()
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(true))
    })
    it('returns data correctly', async () => {
        const store = new VisitStore()
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(false))
    })
    // it('saves correctly and polls for status', async () => {
    //     const store = new VisitStore()
    //     const visit = Object.assign(new Visit(), {
    //         lock_groups: [],
    //         from_date: '2019-05-11T16:40:00.000Z',
    //         to_date: null,
    //         tagNumbers: [],
    //         archetype_ids: ['9108859f-c93a-48dd-8e49-8725390d063d'],
    //     })
    //     await store.save(visit, 'profile-id')
    //     expect(axios.post).toHaveBeenCalledWith(
    //         'https://csp-dev.thecollective.com/ac-api/profile/profile-id/visit',
    //         {
    //             archetype_ids: ['9108859f-c93a-48dd-8e49-8725390d063d'],
    //             archetypes: [],
    //             from_date: '2019-05-11T16:40:00.000Z',
    //             id: null,
    //             lock_groups: [],
    //             tag_numbers: [],
    //             to_date: null,
    //         }
    //     )
    //     expect(store.isLoading).toBe(true)
    //     setTimeout(() => {
    //         expect(store.isLoading).toBe(false)
    //     })
    // })

    it('add tags correctly', async () => {
        const store = new VisitStore()
        const fakeStore: any = Object.assign(store)
        fakeStore.detail = new Visit()
        const numberOfTags = 0
        fakeStore.addTag({ tagNumber: '123123123' }, '1233123123', '123123123')
        expect(fakeStore.isTagLoading).toBe(true)
        expect(axios.post).toHaveBeenCalledWith(
            'https://csp-dev.thecollective.com/ac-api/profile/1233123123/visit/123123123/tag',
            { tag_number: '123123123' }
        )
        setTimeout(() => {
            expect(fakeStore.item.tagNumbers.length).toBe(numberOfTags + 1)
        }, 100)
    })

    it('add rooms correctly', async () => {
        const store = new VisitStore()
        const fakeStore: any = Object.assign(store)
        fakeStore.detail = new Visit()
        const numberOfRooms = 0
        const lockgroup = new LockGroup('123123123', 'a-name', 'a-type')
        fakeStore.addAccess(lockgroup, '1233123123', '123123123')
        expect(fakeStore.isRoomLoading('123123123')).toBe(true)
        expect(axios.post).toHaveBeenCalledWith(
            'https://csp-dev.thecollective.com/ac-api/profile/1233123123/visit/123123123/lockgroup',
            { lock_group_id: '123123123' }
        )
        setTimeout(() => {
            expect(fakeStore.item.lockGroups.length).toBe(numberOfRooms + 1)
        }, 100)
    })

    it('remove tags correctly', async () => {
        const store = new VisitStore()
        const fakeStore: any = Object.assign(store)
        fakeStore.detail = new Visit()
        fakeStore.detail.tagNumbers.push('123123123')
        const numberOfTags = fakeStore.detail.tagNumbers.length
        fakeStore.removeTag('123123123', '1233123123', '123123123')
        expect(fakeStore.isTagLoading).toBe(true)
        expect(axios.patch).toHaveBeenCalledWith(
            'https://csp-dev.thecollective.com/ac-api/profile/1233123123/visit/123123123/tag',
            { tag_numbers: ['123123123'] }
        )
        setTimeout(() => {
            expect(fakeStore.item.tagNumbers.length).toBe(numberOfTags - 1)
            expect(fakeStore.isTagLoading).toBe(false)
        }, 100)
    })

    it('remove rooms correctly', async () => {
        const store = new VisitStore()
        const fakeStore: any = Object.assign(store)
        fakeStore.detail = new Visit()
        const lockgroup = new LockGroup('123123123', 'a-name', 'a-type')
        fakeStore.detail.lockGroups.push(lockgroup)
        const numberOfRooms = fakeStore.detail.lockGroups.length
        fakeStore.removeAccess('123123123', '1233123123', '123123123')
        expect(axios.delete).toHaveBeenCalledWith(
            'https://csp-dev.thecollective.com/ac-api/profile/1233123123/visit/123123123/lockgroup/123123123'
        )
        setTimeout(() => {
            expect(fakeStore.item.lockGroups.length).toBe(numberOfRooms - 1)
        }, 100)
    })
})
