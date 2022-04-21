import axios from "axios";
import {projectAction} from "../store/project_slice";

axios.defaults.baseURL = "http://localhost:8080/task/"

export const SEND_REQUEST = (action, url, data, id) => {
    return async (dispatch) => {
        const send = async () => {
            await axios({
                method: action,
                url: `${url}${id ? id : ''}`,
                data: data,
            })
        }

        try {
            await send()
            if (url.includes('project/add')) {
                dispatch(GET_REQUEST('project/find-all-project', null, null))
            }

        }catch (error) {
            return(dispatch(projectAction.setError(error.response.data)));
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

export const GET_REQUEST = (url, id, token) => {
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
            if (!url.includes("task")) {
                if (id !== null) {
                    dispatch(projectAction.selectedProject(response))
                }
                else {
                    dispatch(projectAction.loadProject(response))
                }
            }
        }catch (error) {
            dispatch(projectAction.setError(error.response.data))
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