import React from 'react'
import { shallow, mount } from 'enzyme'

import { Grid, GridProps } from '.'

type Dummy = { firstName: string; lastName: string }

describe('<Grid />', () => {
    let props: GridProps<Dummy>
    beforeEach(() => {
        props = {
            loading: false,
            onRowClicked: jest.fn(() => {}),
            columnDefs: [
                {
                    headerName: 'First Name',
                    field: 'firstName',
                },
                {
                    headerName: 'Last Name',
                    field: 'lastName',
                },
            ],
            rowData: [
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                },
                {
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                },
            ],
        }
    })

    it('renders correctly', () => {
        const component = <Grid {...props} />
        expect(shallow(component)).toMatchSnapshot()
    })

    it('renders when there is no data', () => {
        const component = <Grid {...props} rowData={[]} />
        expect(shallow(component)).toMatchSnapshot()
    })

    it('renders when is loading', () => {
        const component = <Grid {...props} loading={true} />
        expect(shallow(component)).toMatchSnapshot()
    })
})
