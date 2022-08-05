import {useContext} from "react";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";

import {GET_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {AuthContext, NotificationContext} from "../setup/context/Context";

import {projectAction} from "../setup/slice/project";
import {taskAction} from "../setup/slice/task"

export const useProject = () => {
    const authCtx = useContext(AuthContext)
    const {setNotificationProperty} = useContext(NotificationContext)
    const dispatch = useAppDispatch();
    const {project, projects, message, error} = useAppSelector((state) => state.project)

    const setProjects = (projects: object) => {
        dispatch(projectAction.loadProject(projects))
    }

    const setProject = (project: any) => {
        dispatch(projectAction.selectedProject(project))
        dispatch(taskAction.loadTask(project.task))
    }

    const setTaskDue = (task: object) => {
        dispatch(taskAction.setTaskDue(task))
    }

    const setError = (error: object) => {
        dispatch(projectAction.setError(error))
    }

    const loadProjects = () => {
        const {userID,} = authCtx.getCookie()
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.USER_PROJECT(userID), setProjects, setError))
    }


    const loadTaskDue = () => {
        const {userID} = authCtx.getCookie()
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.USER_TASK(userID), setTaskDue, setError))
    }

    const findProjectByIdentifier = (identifier: string) => {
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.FIND_PROJECT(identifier), setProject, setError))
    }
    
    const setProjectTasks = (identifier: string) => {
        findProjectByIdentifier(identifier)
    }

    const deleteProject = (identifier: string, notificationAction: () => void) => {
        setNotificationProperty({
            identifier: identifier,
            message: `Are you sure you want to delete project ${identifier}?`,
            showBtn: true,
            showNotification: true,
            title: `Delete Project`
        })
        notificationAction()
    }

    return {loadProjects, loadTaskDue, findProjectByIdentifier, setProjectTasks, deleteProject}

}