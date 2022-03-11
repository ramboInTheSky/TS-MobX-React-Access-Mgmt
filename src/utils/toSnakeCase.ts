import _ from 'lodash'

export const toSnakeCase: any = (obj: any) => {
    let rtn = obj
    if (typeof obj === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(toSnakeCase)
        } else if (_.isEmpty(obj)) {
            rtn = null
        } else {
            rtn = {}
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = key
                        .replace(/\W+/g, '_')
                        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                        .toLowerCase()
                    rtn[newKey] =
                        obj[key] === '' && obj[key].trim() === ''
                            ? null
                            : toSnakeCase(obj[key])
                }
            }
        }
    }
    return rtn
}
