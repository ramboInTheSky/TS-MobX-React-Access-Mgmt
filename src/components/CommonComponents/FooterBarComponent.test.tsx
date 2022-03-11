import React from 'react'
import { shallow } from 'enzyme'

import { ButtonsContainer, ActionsBar } from './FooterBarComponents'

describe('<FooterBarComponents />', () => {
   
    it('renders correctly ButtonsContainer', () => {
        expect(shallow(<ButtonsContainer />)).toMatchSnapshot()
		})

		it('renders correctly ActionsBar', () => {
			expect(shallow(<ActionsBar />)).toMatchSnapshot()
	})

})
