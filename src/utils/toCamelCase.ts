import _ from 'lodash'

export const toCamelCase: any = (obj: any) => {
    let rtn = obj
    if (typeof obj === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(toCamelCase)
        } else if (_.isEmpty(obj)) {
            rtn = null
        } else {
            rtn = {}
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = key.replace(/(_\w)/g, k =>
                        k[1].toUpperCase()
                    )
                    rtn[newKey] = toCamelCase(obj[key])
                }
            }
        }
    }
    return rtn
}
