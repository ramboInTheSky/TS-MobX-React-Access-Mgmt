export class AuthMock {
    public user: any = {
        accessToken: 'xZXnpwklGhqd-zN5pJKbkHXNg5jBdJYu',
        idToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UY3…XhKpVLcBSw6qUe4KgjCI4sIgDa3_Kh7TbaSLgd__pJdZLriQg',
        idTokenPayload: {},
        appState: null,
        refreshToken: null,
    }
    public login = jest.fn()
    public checkSession = jest.fn()
    public logout = jest.fn()
    public getUser = jest.fn(() => this.user)
    public redirectToPage = '/profile/123'
}
