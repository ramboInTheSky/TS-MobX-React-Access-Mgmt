import { getDateTimeString } from '.'

describe('<toCamelCase />', () => {
    it('returns a new date and time string', () => {
        const testItem = '2019-05-13T17:57:42.351Z'
        expect(getDateTimeString(testItem)).toEqual(
            'this is a date, this is a time'
        )
    })

    it('returns a string representing the future 1', () => {
        const testItem = null
        expect(getDateTimeString(testItem as any)).toEqual('The Future')
    })

    it('returns a string representing the future 2', () => {
        const testItem = ''
        expect(getDateTimeString(testItem)).toEqual('The Future')
    })

    it('returns a string representing the future 3', () => {
        const testItem = undefined
        expect(getDateTimeString(testItem)).toEqual('The Future')
    })

    it('returns a string representing an invalid date', () => {
        const testItem = 'null'
        expect(getDateTimeString(testItem)).toEqual('Invalid Date')
    })
})
