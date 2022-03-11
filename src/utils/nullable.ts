import _ from 'lodash'

export const nullable = (obj: any) => {
    const newObj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = _.isEmpty(obj[key]) ? null : obj[key]
        }
    }
    return newObj
}
