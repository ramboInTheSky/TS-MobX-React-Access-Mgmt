import { variables } from './theme'
import { urls } from './urls'

describe('<variables />', () => {
    it('renders correctly', () => {
        expect(variables).toMatchSnapshot()
    })
})
describe('<urls />', () => {
    it('renders correctly', () => {
        expect(urls).toMatchSnapshot()
    })
})
