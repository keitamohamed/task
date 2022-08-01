import {useContext} from "react";
import {AuthContext, NotificationContext} from "../setup/context/Context";
import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {GET_REQUEST} from "../api/Request";
import {ApiPath} from "../api/URLPath";

export const useTask = () => {
    const authCtx = useContext(AuthContext)
    const {setNotificationProperty} = useContext(NotificationContext)
    const dispatch = useAppDispatch();
    const {} = useAppSelector((state) => state.task)

    const loadTask = (identifier: string) => {
        const {userID} = authCtx.getCookie()
        // @ts-ignore
        dispatch(GET_REQUEST(null, ApiPath.LOAD_TASK(identifier), null, null))
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