import {ReactNode} from "react";

export interface AuthContextProperty {
    getCookie: () => any,
    setCredentials: (userCredential: CredentialsType) => void
    setUserNameID: (date: {userID: string, name: string}) => void
    logout: () => void
}

export interface UIContextProps {
    getLogoProperties: () => any
    getModelProperty: () => any,
    setLogoProperties: (logoProperties: LogoProperty) => void,
    setModelProp: (isNewTask: boolean) => void
}

export interface NotificationProperty {
    getNotificationsProperty: () => NotificationStateProps,
    setNotificationProperty: (props: NotificationStateProps) => void,
    setNotificationMessage: (message: string, showNotification: boolean, showBtn: boolean) => void
    hideNotification: () => void,
    hideNotificationTimeout: (seconds: number) => void
}

export interface InitialState {
    project: {
        name: string,
        identifier: string,
        description: string,
        startDate: Date,
        endDate: Date,
    }
    projects: Object[]
    message: string,
    error: string
}

export interface TaskInitialState {
    task: {
        summary: string,
        status: string,
        priority: string,
        dueDate: Date,
        createAt: Date,
        updateAt: Date,
    },
    tasks: any[],
    taskDue: any[],
    message: any,
    error: any
}

export interface CredentialsType {
    taskAccessToken: string,
    name: string,
    userID: string,
    email: string
    code: string
}

export interface Login {
    email: string
    password: string
}

export interface CredError {
    firstName: string,
    lastName: string,
    message: string,
    auth: {
        email: string,
        password: string
    }
}

export interface Props {
    children?: ReactNode
}

export interface NotificationStateProps {
    title: string,
    identifier: string,
    message: string,
    showBtn: boolean
    showNotification: boolean
}

export type LogoProperty = {
    width: string,
    color: string
}
