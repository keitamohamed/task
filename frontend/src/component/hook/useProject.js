import {useContext} from "react";
import {useDispatch} from "react-redux";

import {taskAction} from "../../store/task_slice";
import {projectAction} from "../../store/project_slice";
import {GET_REQUEST} from "../../action/request";
import {AuthContext} from "../context/Context";

export const useProject = () => {
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)

    const setDueTask = (response) => {
        dispatch(taskAction.setTaskDue(response))
    }

    const setProjects = (response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setTaskErrorMessage = (error) => {
        dispatch(taskAction.setError(error))
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error))
    }

    const loadProject = () => {
        const {userID, accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`user/${userID}/projects`, setProjects, setError, accessToken))
    }

    const loadTaskDue = () => {
        const {userID, accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`user/${userID}/task-due-soon`, setDueTask, setTaskErrorMessage, accessToken))
    }

    return {loadProject, loadTaskDue}
}