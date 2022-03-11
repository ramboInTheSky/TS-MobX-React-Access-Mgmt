import { observable, action } from 'mobx'

export type VariantType = 'success' | 'alert' | 'info' | 'error'

export class NotificationStore {
    @observable public isOpen: boolean = false

    @observable public message: string = ''

    @observable public variant: VariantType = 'info'

    public isNotificationShown() {
        return this.isOpen
    }

    @action
    public setNotification(_variant: VariantType, _message: string) {
        this.message = _message;
        this.variant = _variant;
        this.isOpen = true;
    }

    @action
    public disableNotification() {
        this.isOpen = false;
    }
}
