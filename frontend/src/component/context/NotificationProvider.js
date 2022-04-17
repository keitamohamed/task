import {NotificationContext} from "./Context";
import {useState} from "react";
import {useSelector} from "react-redux";

const NotificationProvider = ({children}) => {
    const {message} = useSelector((state) => state.project)
    const [notification, setNotification] = useState({
        title: '',
        identifier: '',
        message: '',
        showBtn: false,
        showNotification: false
    })

    const setConformationNotifications = ({title, identifier, message, showBtn, showNotification}) => {
        setNotification({
            ...notification,
            title: title,
            identifier: identifier,
            message: message,
            showBtn: showBtn,
            showNotification: showNotification
        })
    }

    const setActionMessage = ({message}) => {
        setNotification({
            ...notification,
            message: message,
            showNotification: true,
            showBtn: false
        })
    }

    const hideNotification = () => setNotification({...notification, showNotification: false})

    const hideNotificationWithTimeout = (timeout) => {
        setTimeout(hideNotification, timeout)
    }

    return (
        <NotificationContext.Provider value={{
            setConformationNotifications,
            hideNotification,
            setActionMessage,
            hideNotificationWithTimeout,
            notification,
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider