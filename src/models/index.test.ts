import { Profile, CreateProfile, EditProfile } from './Profile'
import { Visit, CreateVisit } from './Visit'
import { Tag } from './Tag'
import { LockGroup } from './LockGroups'

describe('Profile', () => {
    it('renders correctly', () => {
        expect(new Profile()).toMatchSnapshot()
    })
})
describe('CreateProfile', () => {
    it('renders correctly', () => {
        expect(new CreateProfile()).toMatchSnapshot()
    })
})
describe('EditProfile', () => {
    it('renders correctly', () => {
        expect(new EditProfile()).toMatchSnapshot()
    })
})
describe('Visit', () => {
    it('renders correctly', () => {
        expect(new Visit()).toMatchSnapshot()
    })
})
describe('CreateVisit', () => {
    it('renders correctly', () => {
        expect(new CreateVisit()).toMatchSnapshot()
    })
})
describe('Tag', () => {
    it('renders correctly', () => {
        expect(new Tag()).toMatchSnapshot()
    })
})
describe('LockGroup', () => {
    it('renders correctly', () => {
        expect(new LockGroup()).toMatchSnapshot()
    })
})
