import {useContext} from "react";
import {AuthContext, NotificationContext} from "../setup/context/Context";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {GET_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";
import {taskAction} from "../setup/slice/task";

export const useTask = () => {
    const authCtx = useContext(AuthContext)
    const {setNotificationProperty} = useContext(NotificationContext)
    const dispatch = useAppDispatch();
    const {} = useAppSelector((state) => state.task)


    const setTask = (data: any[]) => {
        dispatch(taskAction.loadTask(data))
    }

    const setError = (error: object) => {
        dispatch(taskAction.setError(error))
    }

    const loadTask = (identifier: string) => {
        const {userID} = authCtx.getCookie()
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.LOAD_TASK(identifier), setTask, setError))
    }

    const deleteTask = (taskID: number) => {
        const {userID} = authCtx.getCookie()
        // @ts-ignore
        dispatch(null, ApiPath.DELETE_TASK(taskID), null, null)
    }

    return {
        loadTask,
        deleteTask
    }
}