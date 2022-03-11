import React from 'react'
import { shallow } from 'enzyme'

import { Header } from '.'
import { AuthMock } from '../../stores/mock/AuthMock'

jest.mock('../../../package.json', () => ({
    version: 'this is a version number',
}))

describe('<Header />', () => {
    let props: any
    beforeEach(() => {
        props = {
            auth: new AuthMock(),
        }
    })
    it('renders correctly', () => {
        expect(shallow(<Header {...props} />)).toMatchSnapshot()
    })

    it('Does open the settings menu', () => {
        const el: any = shallow(<Header {...props} />)
        el.setState({ settingsMenu: true }, () => el.update())
        expect(el).toMatchSnapshot()
    })

    it('Does open the user menu', () => {
        const el: any = shallow(<Header {...props} />)
        el.setState({ userMenu: true }, () => el.update())
        expect(el).toMatchSnapshot()
    })

    it('Does logout', () => {
        const el: any = shallow(<Header {...props} />)
        el.setState({ userMenu: true }, () => el.update())
        const logoutItem = el.dive().find('#logout-menu-item')
        logoutItem.simulate('click', {
            preventDefault: () => {},
            target: { name: 'input', value: 'value' },
        })
        expect(props.auth.logout).toHaveBeenCalled()
    })
})
