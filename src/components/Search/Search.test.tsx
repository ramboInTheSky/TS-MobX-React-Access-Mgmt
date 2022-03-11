import React from 'react'
import { shallow } from 'enzyme'

import { Search, SearchProps } from './Search'
// const Component = (Search as any).wrappedComponent
describe('<Search />', () => {
    let props: SearchProps
    beforeEach(() => {
        props = {
            onChange: jest.fn(() => {}),
            placeholder: 'this is a placeholder',
        }
    })
    it('renders correctly', () => {
        expect(shallow(<Search {...props} />)).toMatchSnapshot()
    })
    
    it('calls onChange on clicking clear', () => {
        const component = shallow(<Search {...props} />)
        component.find('[title="Search"]').simulate('click')
        expect(props.onChange).toHaveBeenCalled()
    })
})
