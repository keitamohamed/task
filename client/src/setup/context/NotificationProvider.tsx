import { useState } from "react";
import { NotificationContext } from "./Context"
import {NotificationStateProps, Props} from "../../interface_type/interface";

const {Provider} = NotificationContext
let notificationElement: HTMLElement | null;

const NotificationProvider = ({children}: Props) => {

    const [notification, setNotification] = useState<NotificationStateProps>({
        identifier: '',
        message: '',
        showBtn: false,
        showNotification: false,
        title: ''
    })
    
    const getNotificationsProperty = () => {
        return notification
    }

    const setNotificationProperty = (props: NotificationStateProps) => {
        setNotification({
            identifier: props.identifier,
            message: props.message,
            showBtn: props.showBtn,
            showNotification: props.showNotification,
            title: props.title

        })
    }

    const setNotificationMessage = (message: string, showNotification: boolean, showBtn: boolean) => {
        setNotification({
            ...notification,
            message,
            showNotification,
            showBtn
        })
    }

    const showNotification = (title: string, message: string, identifier: string) => {
        setNotificationProperty({
            identifier: identifier,
            message: message,
            showBtn: true,
            showNotification: true,
            title: title
        })
        notificationElement?.removeAttribute('closed')
        notificationElement?.setAttribute('open', '')
    }

    const cancelRequest = (showNotification: boolean, showBtn: boolean) => {
        setNotification({
            ...notification,
            showNotification,
            showBtn
        })
    }

    const hideNotification = () => {
        setNotification({
            ...notification,
            showBtn: false,
            showNotification: false,
        })
    }

    const reSetNotification = () => {
        setNotificationProperty({
            identifier: '',
            message: '',
            showBtn: false,
            showNotification: false,
            title: ''
        })
    }

    const hideNotificationTimeout = async (second: number) => {
        setTimeout(hideNotification, second)
        setTimeout(reSetNotification, (second + 2000))
    }

    return (
        <Provider value={{
            getNotificationsProperty,
            setNotificationProperty,
            setNotificationMessage,
            hideNotification,
            hideNotificationTimeout,
            showNotification,
            cancelRequest
        }}>
            {children}
        </Provider>
    )
}

export default NotificationProvider