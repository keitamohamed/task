import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {projectAction} from "../setup/slice/project";
import {GET_REQUEST} from "../api/Request";
import {useContext} from "react";
import {AuthContext} from "../setup/context/Context";

export const useProject = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch();
    const {project, projects, message, error} = useAppSelector((state) => state.project)

    const action = (projects: object) => {
        dispatch(projectAction.loadProject(projects))
    }

    const setError = (error: object) => {
        dispatch(projectAction.setError(error))
    }

    const loadProject = () => {
        // @ts-ignore
        dispatch(GET_REQUEST(authCtx.credentials.token, path.Projects, action, setError))
    }

}