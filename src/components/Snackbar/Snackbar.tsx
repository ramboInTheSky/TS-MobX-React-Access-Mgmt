import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
// import Slide from '@material-ui/core/Slide';
// import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Alert, Message } from './Components';
import { StoreNames, NotificationStore } from '../../stores'
import { observer, inject } from 'mobx-react'

export interface NotificationMessageProps {
    children?: string
}

export interface NotificationMessageConnectedProps extends NotificationMessageProps {
    notifications: NotificationStore
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

// function transitionLeft(props: TransitionProps) {
//     return <Slide {...props} direction='up' />;
// };

@inject(StoreNames.notifications)
@observer
export class SnackbarComponent extends React.Component<NotificationMessageProps> {
    get store() {
        return this.props as NotificationMessageConnectedProps
    }

    public handleClose = () => {
        this.store.notifications.disableNotification()
    }

    // public handleClick = (transition: React.ComponentType<TransitionProps>) => () => {
    //     this.setState({ open: true, Transition: transition });
    //   };

    public render() {
        const { isOpen, variant, message } = this.store.notifications
        const Icon = variantIcon[variant]
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isOpen}
                    autoHideDuration={10000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'notification',
                    }}>
                    <Alert
                        type={variant}
                        message={
                            <Message id="notification">
                                <Icon
                                    style={{ fontSize: '25', opacity: 0.9, marginRight: 10 }}
                                />
                                {message}
                            </Message>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        )
    }
}
