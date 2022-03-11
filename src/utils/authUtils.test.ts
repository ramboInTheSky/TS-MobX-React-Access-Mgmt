import {
    randomString,
    urlEncodeB64,
    bufferToBase64UrlEncoded,
    getConfig,
    sha256,
    debounce,
} from './authUtils'

describe('authUtils', () => {
    it('randomString', () => {
        expect(randomString).toMatchSnapshot()
    })

    it('urlEncodeB64', () => {
        expect(urlEncodeB64).toMatchSnapshot()
    })

    it('bufferToBase64UrlEncoded', () => {
        expect(bufferToBase64UrlEncoded).toMatchSnapshot()
    })

    it('sha256', () => {
        expect(sha256).toMatchSnapshot()
    })

    it('getConfig', () => {
        expect(getConfig).toMatchSnapshot()
    })

    it('debounce', () => {
        expect(debounce).toMatchSnapshot()
    })
})
