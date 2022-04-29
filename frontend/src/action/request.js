import axios from "axios";
import {projectAction} from "../store/project_slice";

axios.defaults.baseURL = "http://localhost:8080/task/"

export const SEND_REQUEST = (requestAction, url, data, action, setError) => {
    return async (dispatch) => {
        const send = async () => {
            return axios({
                method: requestAction,
                url: url,
                data: data,
            });
        }

        try {
            const response = await send()
            action(response.data)
        }catch (error) {
            setError(error)
        }
    }
}

export const UPDATE_REQUEST = (url, data) => {
    return async (dispatch) => {
        const send = async () => {
            return axios({
                method: 'PUT',
                url: `${url}`,
                data: data,
            });
        }

        try {
            const response = await send()
            dispatch(GET_REQUEST('project/find-all-project', null, null))
            dispatch(projectAction.setMessage(response.data))
        }catch (error) {
            return(dispatch(projectAction.setError(error.response.data)));
        }
    }
}

export const GET_REQUEST = (url, id, token, action, setError) => {
    return async (dispatch) => {
        const fetchDate = async () => {
            const response = await axios({
                method: 'GET',
                url: `${url}${id ? id : ''}`,
            })
            if (response.status !== 200) {
            }
            return await response.data;
        }

        try {
            const response = await fetchDate()
            action(url, id, response)
        }catch (error) {
            setError(error)
        }
    }
}

export const DELETE_REQUEST = (url, id, token) => {
    return async (dispatch) => {
        const fetchDate = async () => {
            const response = await axios({
                method: 'DELETE',
                url: `${url}${id ? id : ''}`,
            })
            if (response.status !== 200) {

            }
            return await response.data;
        }

        try {
            const project = await fetchDate()
            dispatch(GET_REQUEST('project/find-all-project', null, token))
            if (id !== null) {
                dispatch(projectAction.selectedProject(project))
            }
            else {
                dispatch(projectAction.loadProject(project))
            }
        }catch (error) {
            dispatch(projectAction.setError(error.response.data))
        }
    }
}