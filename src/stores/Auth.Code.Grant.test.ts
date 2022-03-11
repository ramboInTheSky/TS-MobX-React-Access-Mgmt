import { AuthStore } from './Auth.Code.Grant'

jest.mock('auth0-js', () => ({
    WebAuth: jest.fn().mockImplementation(() => {
        return {
            parseHash: jest.fn(),
            client: {
                userInfo: jest.fn(),
            },
            authorize: jest.fn(),
            checkSession: jest.fn(),
            logout: jest.fn(),
        }
    }),
}))

describe('<AuthStore />', () => {
    // reference of the original method
    const { reload } = window.location

    beforeAll(() => {
        Object.defineProperty(window.location, 'reload', {
            configurable: true,
        })
        window.location.reload = jest.fn()
        // delete window.location;
        // window.location = { reload: jest.fn() };
    })
    afterAll(() => {
        window.location.reload = reload
    })

    it('renders correctly', () => {
        const store = new AuthStore()
        expect(store).toMatchSnapshot()
    })
})
