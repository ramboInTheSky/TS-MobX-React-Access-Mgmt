
import { AuthStore } from './Auth.Implicit.Grant'

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
    it('renders correctly', () => {
        const store = new AuthStore()
        expect(store).toMatchSnapshot()
    })

    it('calls parseHash when attempting to retrieve a user session', () => {
        const store = new AuthStore()
        store.getUser()
        expect(store.auth0Instance.parseHash).toHaveBeenCalled()
    })

    it('calls auth0.login when attempting to login', () => {
        const store = new AuthStore()
        store.login()
        expect(store.auth0Instance.authorize).toHaveBeenCalled()
    })

    it('calls auth0.checkSession when attempting to checkSession', () => {
        const store = new AuthStore()
        store.checkSession()
        expect(store.auth0Instance.checkSession).toHaveBeenCalled()
    })

    it('calls auth0.logout when attempting to logout', () => {
        const store = new AuthStore()
        store.logout()
        expect(store.auth0Instance.logout).toHaveBeenCalled()
        expect(store.user).toBe(undefined)
    })
})
