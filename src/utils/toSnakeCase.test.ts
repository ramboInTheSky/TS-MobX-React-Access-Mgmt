import { toSnakeCase } from './toSnakeCase'

describe('<toSnakeCase />', () => {
    it('returns a new object in camel case', () => {
        const testItem = {
            anotherOBJECTProperty: {
                thisIsATestProperty: {
                    thisIsAnotherTestProperty: 'this is a value',
                },
            },
            thisIsATestProperty: 'this is a value',
            thisIsAnOTherTEstPropertyButWithWeIRDCASING: [
                {
                    thisIsATestProperty: {
                        thisIsAnotherTestProperty: 'this is a value',
                    },
                },
            ],
        }
        expect(toSnakeCase(testItem)).toEqual({
            another_objectproperty: {
                this_is_atest_property: {
                    this_is_another_test_property: 'this is a value',
                },
            },
            this_is_an_other_test_property_but_with_we_irdcasing: [
                {
                    this_is_atest_property: {
                        this_is_another_test_property: 'this is a value',
                    },
                },
            ],
            this_is_atest_property: 'this is a value',
        })
    })

    it('also converts empty strings to null', () => {
        const testItem = {
            anotherOBJECTProperty: {
                thisIsATestProperty: {
                    thisIsAnotherTestProperty: '',
                },
            },
            thisIsATestProperty: 'this is a value',
            thisIsAnOTherTEstPropertyButWithWeIRDCASING: [
                {
                    thisIsATestProperty: {
                        thisIsAnotherTestProperty: '',
                        this_is_another_empty_test_property: '',
                    },
                },
            ],
        }
        expect(toSnakeCase(testItem)).toEqual({
            another_objectproperty: {
                this_is_atest_property: {
                    this_is_another_test_property: null,
                },
            },
            this_is_an_other_test_property_but_with_we_irdcasing: [
                {
                    this_is_atest_property: {
                        this_is_another_empty_test_property: null,
                        this_is_another_test_property: null,
                    },
                },
            ],
            this_is_atest_property: 'this is a value',
        })
    })
})
