import { useState } from "react";
import { NotificationContext } from "./Context"
import {NotificationStateProps, Props} from "../../interface_type/interface";

const {Provider} = NotificationContext

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

    // Change setNotificationAction to setNotificationMessage
    const setNotificationMessage = (message: string, showNotification: boolean, showBtn: boolean) => {
        setNotification({
            ...notification,
            message,
            showNotification,
            showBtn
        })
    }


    const hideNotification = () => ({
        ...notification,
        showNotification: false
    })

    const hideNotificationTimeout = (second: number) => {
        setTimeout(hideNotification, second)
    }

    return (
        <Provider value={{
            getNotificationsProperty,
            setNotificationProperty,
            setNotificationMessage,
            hideNotification,
            hideNotificationTimeout

        }}>
            {children}
        </Provider>
    )
}

export default NotificationProvider