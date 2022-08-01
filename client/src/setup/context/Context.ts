import {createContext} from "react";
import {
    AuthContextProperty,
    CredentialsType, NotificationProperty,
    NotificationStateProps,
    UIContextProps
} from "../../interface_type/interface";


const authDefaultProps: AuthContextProperty = {
    getCookie: () => '',
    setCredentials: (CredentialsType) => '',
    setUserNameID: (data: { userID: string, name: string }) => '',
    logout: () => ''
}

const uiProps: UIContextProps = {
    getLogoProperties: () => '',
    setLogoProperties: () => ''
}

const notificationProps: NotificationProperty = {
    getNotificationsProperty(): NotificationStateProps {
        return {
            identifier: '',
            message: '',
            showBtn: false,
            showNotification: false,
            title: ''
        }
    },
    hideNotification(): void {},
    hideNotificationTimeout(seconds: number): void {},
    setNotificationMessage(message: string, showNotification: boolean, showBtn: boolean): void {},
    setNotificationProperty(props: NotificationStateProps): void {}
}


export const AuthContext = createContext(authDefaultProps)
export const UIContent = createContext(uiProps)
export const NotificationContext = createContext(notificationProps)