export default {
    // tslint:disable-next-line: no-string-literal
    AUTH0_DOMAIN: window['auth_domain'] || '',
    // tslint:disable-next-line: no-string-literal
    AUTH0_CLIENT_ID: window['auth_client_id'] || '',
    // responseType: 'token id_token',
    AUTH0_RESPONSE_TYPE: 'code',
    // AUTH0_RESPONSE_TYPE: 'token id_token',
    REDIRECT_URI: window.location.origin,
    // tslint:disable-next-line: no-string-literal
    API_AUDIENCE: window['auth_audience'] || '',
    AUTH0_SCOPE: 'openid profile email',
}
