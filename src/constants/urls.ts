import apiVersion from './api_versions'

const prefix =
    document.location.hostname === 'localhost'
        ? 'https://csp-dev.thecollective.com'
        : ''

export const urls = Object.freeze({
    profiles: `${prefix}/${apiVersion.profile}profile`,
    visits: `${prefix}/${apiVersion.visit}visit`,
    archetypes: `${prefix}/${apiVersion.archetype}archetype`,
    lockGroups: `${prefix}/${apiVersion.lockgroup}lockgroup`,
})
export default urls
