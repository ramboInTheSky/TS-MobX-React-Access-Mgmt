import { LockGroup } from '../../models/LockGroups';

export class LockGroupMock {
    detail: LockGroup = new LockGroup()
    item = () => this.detail
    data = [
        {
            "id": "111-111-111-111",
            "name": "1.11",
            "type": "room 11",
            "notes": "this is just a room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.12",
            "type": "room 12",
            "notes": "this is the best room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.13",
            "type": "room 13",
            "notes": "this is just a room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.14",
            "type": "room 14",
            "notes": "this is just a room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.15",
            "type": "room 15",
            "notes": "this is just a room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.16",
            "type": "room 16",
            "notes": "this is just a room"
        },
        {
            "id": "123-123-123-123",
            "name": "1.17",
            "type": "room 17",
            "notes": "this is an unlucky room"
        }
    ]
    getList = jest.fn()
    items = []
}