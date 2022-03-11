
import { Store } from './APIStore'

jest.mock('axios', () => () => ({
    get: jest.fn((url: string) =>
        url === 'fail'
            ? Promise.reject({ status: 500 })
            : Promise.resolve({ status: 200, data: {} })
    ),
}))

describe('<Store />', () => {
    it('renders correctly', () => {
        const store = new Store('/url')
        expect(store).toMatchSnapshot()
    })
    it('sets isError if API issues', async () => {
        const store = new Store('fail')
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(true))
    })
    it('returns data correctly', async () => {
        const store = new Store('/url')
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(false))
    })
})
