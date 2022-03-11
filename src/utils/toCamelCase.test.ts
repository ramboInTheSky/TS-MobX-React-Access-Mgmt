import { toCamelCase } from './toCamelCase'

describe('<toCamelCase />', () => {
    it('returns a new object in camel case', () => {
        const testItem = {
            this_is_a_test_property: 'this is a value',
            this_is_anOTher_tEst_property_but_with_weIRD_CASING: [
                {
                    this_is_a_test_property: {
                        this_is_another_test_property: 'this is a value',
                    },
                },
            ],
            another_OBJECT_property: {
                this_is_a_test_property: {
                    this_is_another_test_property: 'this is a value',
                },
            },
        }
        expect(toCamelCase(testItem)).toEqual({
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
        })
    })

    // it('also converts empty strings to null', () => {
    //     const testItem = {
    //         this_is_a_test_property: 'this is a value',
    //         this_is_anOTher_tEst_property_but_with_weIRD_CASING: [
    //             {
    //                 this_is_a_test_property: {
    //                     this_is_another_test_property: '',
    //                     this_is_another_empty_test_property: '',
    //                 },
    //             },
    //         ],
    //         another_OBJECT_property: {
    //             this_is_a_test_property: {
    //                 this_is_another_test_property: '',
    //             },
    //         },
    //     }
    // })
})
