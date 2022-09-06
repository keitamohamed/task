import {useContext} from "react";
import { NotificationContext } from "../setup/context/Context";

export const useNotification = () => {
    const {getNotificationsProperty} = useContext(NotificationContext)

    const notificationAction = () => {
        const notificationElement = document.querySelector('.notification')

        if (getNotificationsProperty().showNotification) {
            if (notificationElement) {
                notificationElement.removeAttribute('closed')
                notificationElement.removeAttribute('closing')
                notificationElement.setAttribute('open', '')
            }
        }
        if (!getNotificationsProperty().showNotification) {
            const notificationElement = document.querySelector('.notification')
            if (notificationElement && notificationElement.hasAttribute('open')) {
                if ( notificationElement) {
                    notificationElement?.setAttribute('closing', '')
                    notificationElement?.addEventListener('animationend', () => {
                        notificationElement?.setAttribute('closed', '')
                        notificationElement?.removeAttribute('closing')
                        notificationElement?.removeAttribute('open')
                    }, {once: true})
                }
            }
        }
    }

    return {notificationAction}
}
