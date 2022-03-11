import { Auth0UserProfile, WebAuth, AuthOptions } from 'auth0-js'
import { observable } from 'mobx'
import opts from '../constants/auth'
import axios from './axios'

const REFRESH_TOKEN_INTERVAL = 60 // seconds
const LOGOUT_INTERVAL = 5 * 60 // seconds

export class AuthStore {
    public get user() {
        return this.loggedUser
    }

    get auth0Instance() {
        return this.auth0
    }

    public get redirectToPage() {
        return this.redirect
    }

    @observable
    private redirect?: string

    @observable
    private auth0: WebAuth
    // private accessToken?: string
    private idToken?: string
    private expiresAt?: number
    private loggedUser?: Auth0UserProfile
    private checkSessionInterval?: NodeJS.Timeout
    private settings: AuthOptions
    private logoutTimeout: any = null

    constructor() {
        this.settings = {
            domain: opts.AUTH0_DOMAIN,
            clientID: opts.AUTH0_CLIENT_ID,
            responseType: opts.AUTH0_RESPONSE_TYPE,
            redirectUri: opts.REDIRECT_URI,
        }
        this.auth0 = new WebAuth(this.settings)
        const userString = localStorage.getItem('user')
        const idTokenString = localStorage.getItem('idToken')
        const expiresAtString = localStorage.getItem('expiresAt')
        this.loggedUser = userString ? JSON.parse(userString) : undefined
        this.idToken = idTokenString ? JSON.parse(idTokenString) : undefined
        this.expiresAt = expiresAtString
            ? JSON.parse(expiresAtString)
            : undefined

        if (this.loggedUser) {
            this.checkSessionInterval = setInterval(
                this.checkSession,
                REFRESH_TOKEN_INTERVAL * 1000
            )
        }
    }

    public getUser = async () => {
        try {
            await this.auth0.parseHash(
                { hash: window.location.hash },
                async (err, data) => {
                    if (err) {
                        return console.log(err)
                    }
                    if (data) {
                        if (data.accessToken) {
                            this.setVars(data)
                            try {
                                return await this.auth0!.client.userInfo(
                                    data.accessToken,
                                    (error, user) => {
                                        if (error) {
                                            console.log(error)
                                        }
                                        this.setUser(user)
                                        return user
                                    }
                                )
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
        return this.loggedUser
    }

    public login = () => {
        try {
            this.auth0.authorize({})
        } catch (err) {
            console.log(err)
        }
    }

    public checkSession = async () => {
        try {
            await this.auth0.checkSession({}, (err, data) => {
                if (err) {
                    console.log(err)
                    this.logout()
                } else {
                    if (!data.accessToken) {
                        this.logout()
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    public resetTimer() {
        this.setTimer()
    }

    public logout = () => {
        if (this.checkSessionInterval) {
            clearInterval(this.checkSessionInterval)
        }
        localStorage.removeItem('user')
        localStorage.removeItem('idToken')
        localStorage.removeItem('expiresAt')
        this.loggedUser = undefined
        this.auth0.logout({ returnTo: this.settings.redirectUri })
    }

    private setTimer() {
        console.debug('logout timeout: ', this.logoutTimeout)
        clearInterval(this.logoutTimeout)
        this.logoutTimeout = setTimeout(() => {
            this.logout()
        }, LOGOUT_INTERVAL * 1000)
    }

    private setUser(user: Auth0UserProfile) {
        this.loggedUser = user
        localStorage.setItem('user', JSON.stringify(user))
    }

    private setVars(data: any) {
        if (data.expiresIn) {
            // Set the time that the Access Token will expire at
            const expiresAt = data.expiresIn * 1000 + new Date().getTime()
            // this.accessToken = data.accessToken
            try {
                axios.defaults.headers.common.Authorization = `Bearer ${
                    data.accessToken
                }` // for all requests
                this.setTimer()
            } catch (err) {
                console.log('impossible to parse Bearer Token')
            }
            this.idToken = data.idToken
            this.expiresAt = expiresAt
            localStorage.setItem('expiresAt', JSON.stringify(this.expiresAt))
            localStorage.setItem('idToken', JSON.stringify(this.idToken))
        }
    }
}
export default AuthStore
