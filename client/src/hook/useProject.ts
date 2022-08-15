import {useContext} from "react";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";

import {DELETE_REQUEST, GET_REQUEST, POST_REQUEST, UPDATE_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {AuthContext, NotificationContext} from "../setup/context/Context";

import {projectAction} from "../setup/slice/project";
import {taskAction} from "../setup/slice/task"

export const useProject = () => {
    const authCtx = useContext(AuthContext)
    const {setNotificationProperty, setNotificationMessage, hideNotificationTimeout} = useContext(NotificationContext)
    const dispatch = useAppDispatch();
    const {project, projects, message, error} = useAppSelector((state) => state.project)

    const setProjects = (projects: object) => {
        dispatch(projectAction.loadProject(projects))
    }

    const setMessage = (message: any) => {
        dispatch(projectAction.setMessage(message))
    }

    const setProject = (project: any) => {
        dispatch(projectAction.selectedProject(project))
        dispatch(taskAction.loadTask(project.task))
    }

    const deleteAction = (data: {message: string, code: string, status: string}) => {
        loadProjects()
        setNotificationMessage(data.message!, true, false)
    }

    const setTaskDue = (task: object) => {
        dispatch(taskAction.setTaskDue(task))
    }

    const setError = (error: object) => {
        dispatch(projectAction.setError(error))
    }

    const setProjectTasks = (identifier: string) => {
        findProjectByIdentifier(identifier)
    }

    const addNewProject = async () => {
        // @ts-ignore
        await dispatch(POST_REQUEST(ApiPath.ADD_NEW_PROJECT(authCtx.getCookie().userID), project, setMessage, setError))
    }
    
    const updateProject = async () => {
        // @ts-ignore
        await dispatch(UPDATE_REQUEST( ApiPath.UPDATE_PROJECT(project.identifier), project, setMessage, setError))
        loadProjects()
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

    const deleteProject = () => {
        // @ts-ignore
        dispatch(DELETE_REQUEST(null, ApiPath.DELETE_PROJECT(project.identifier), deleteAction, setError))
        hideNotificationTimeout(5000)
    }

    return {
        addNewProject,
        updateProject,
        loadProjects,
        loadTaskDue,
        findProjectByIdentifier,
        setProjectTasks,
        deleteProject}
}