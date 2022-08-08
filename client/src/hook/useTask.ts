import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {GET_REQUEST, POST_REQUEST, UPDATE_REQUEST, DELETE_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {taskAction} from "../setup/slice/task";
import { projectAction } from "../setup/slice/project";
import {useContext} from "react";
import { NotificationContext } from "../setup/context/Context";

export const useTask = () => {
    const {showNotification} = useContext(NotificationContext)
    const dispatch = useAppDispatch();
    const {task, tasks, message} = useAppSelector((state) => state.task)
    const {project, projects} = useAppSelector((state) => state.project)


    const setTask = (data: any[]) => {
        dispatch(taskAction.loadTask(data))
    }

    const setProjectTask = (task: any) => {
        dispatch(taskAction.loadTask(task))
    }
    
    const setResponseMessage = async (response: any) => {
        await dispatch(taskAction.setMessage(response))
        await findProjectTaskSort(project.identifier)
        showNotification(
            'Task Deleted',
            `${response.message}`,
            task.taskID.toString())
        console.log(message.message)
    }

    const setError = (error: any) => {
        if (error.error) {
            dispatch(taskAction.setError(error))
        }else {
            dispatch(taskAction.setError(error))
        }
    }

    const addTask = async () => {
        // @ts-ignore
        await dispatch(POST_REQUEST(ApiPath.ADD_TASK(project.identifier), task, setResponseMessage, setError))
    }

    const updateProject = async () => {
        // @ts-ignore
        await dispatch(UPDATE_REQUEST(ApiPath.UPDATE_TASK(task.taskID), task, setResponseMessage, setError))
        await findProjectTaskSort(project.identifier)
    }

    const loadTask = (identifier: string) => {
        const selectedProject = projects.find(p => p.identifier === identifier)
        dispatch(projectAction.selectedProject(selectedProject))
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.LOAD_TASK(identifier), setTask, setError))
    }

    const findProjectTaskSort = (identifier: string) => {
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.LOAD_PROJECT_TASK_SORT(identifier), setProjectTask, setError))
    }

    const deleteTask = () => {
        // @ts-ignore
        dispatch(DELETE_REQUEST(null, ApiPath.DELETE_TASK(task.taskID), setResponseMessage, setError))
    }

    return {
        addTask,
        updateProject,
        loadTask,
        deleteTask
    }
}