import { oc } from 'ts-optchain'
export const getErrorCode = (e: any) => {
    if (e.status === 403 || e.status === 401) {
        return 'You are not authorised to see this content, if the problem persists contact your Administrator.'
    }
    if (e.errorInfo) {
        return e.errorInfo
    }
    if (oc(e).response.data.message()) {
        return e.response.data.message
    }
    if (e.message) {
        return e.message
    }
    if (e.errorMessage) {
        return e.errorMessage
    }
    return 'Please try reload the page, if the problem persists contact your Administrator.'
}
