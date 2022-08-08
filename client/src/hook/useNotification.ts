import {useContext, useEffect} from "react";
import {AuthContext, NotificationContext, UIContent} from "../setup/context/Context";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {DELETE_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {useProject} from "./useProject";
import {projectAction} from "../setup/slice/project";

export const useNotification = () => {
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIContent)
    const dispatch = useAppDispatch()
    const {message} = useAppSelector((state) => state.project)
    const {loadProjects} = useProject()
    const {setNotificationMessage} = useContext(NotificationContext)

    const closeNotification = (notificationElement: HTMLElement | null) => {
        notificationElement?.setAttribute('closing', '')
        notificationElement?.addEventListener('animationend', () => {
            notificationElement?.setAttribute('closed', '')
            notificationElement?.removeAttribute('closing')
            notificationElement?.removeAttribute('open')
        }, {once: true})
    }

    const deleteAction = (data: {message: string, code: string, status: string}) => {
        loadProjects()
        setNotificationMessage(data.message!, true, false)
    }

    // const cancel = () => {
    //     notificationAction()
    // }

    // const conform = async (method: () => void) => {
    //     const {identifier} = getNotificationsProperty()
    //     // @ts-ignore
    //     // await dispatch(DELETE_REQUEST(null, ApiPath.DELETE_PROJECT(identifier), deleteAction, setErrorMessage))
    //     await method()
    //     hideNotificationTimeout(5000)
    // }

    const setErrorMessage = (error: any) => {
      dispatch(projectAction.setError(error))
    }

    // useEffect(() => {
    //     if (notificationMessage === undefined) {
    //         notificationMessage = document.querySelector('.notification')
    //     }
    // }, [notificationMessage])

    return {closeNotification}
}