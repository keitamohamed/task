import {useContext, useEffect} from "react";
import {AuthContext, NotificationContext, UIContent} from "../setup/context/Context";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {DELETE_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {useProject} from "./useProject";
import {projectAction} from "../setup/slice/project";

let notificationMessage: HTMLElement | null

export const useNotification = () => {
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIContent)
    const dispatch = useAppDispatch()
    const {message} = useAppSelector((state) => state.project)
    const {loadProjects} = useProject()
    const {getNotificationsProperty, setNotificationMessage, hideNotificationTimeout} = useContext(NotificationContext)

    const notificationAction = () => {
        notificationMessage?.setAttribute('closing', '')
        notificationMessage?.addEventListener('animationend', () => {
            notificationMessage?.setAttribute('closed', '')
            notificationMessage?.removeAttribute('closing')
            notificationMessage?.removeAttribute('open')
        }, {once: true})
    }

    const deleteAction = (data: {message: string, code: string, status: string}) => {
        loadProjects()
        setNotificationMessage(data.message!, true, false)
    }

    const cancel = () => {
        notificationAction()
    }

    const conform = async (response: any) => {
        const {identifier} = getNotificationsProperty()
        // @ts-ignore
        await dispatch(DELETE_REQUEST(null, ApiPath.DELETE_PROJECT(identifier), deleteAction, setErrorMessage))
        hideNotificationTimeout(5000)
    }

    const setErrorMessage = (error: any) => {
      dispatch(projectAction.setError(error))
    }

    useEffect(() => {
        if (notificationMessage === undefined) {
            notificationMessage = document.querySelector('.notification')
        }
    }, [notificationMessage])

    return {conform, cancel}
}