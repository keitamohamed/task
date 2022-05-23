import axios from "axios";
import {projectAction} from "../store/project_slice";

// axios.defaults.baseURL = "http://localhost:8080/task/"

export const SEND_REQUEST = (requestAction, url, data, action, setError, token) => {

    return async () => {
        const send = async () => {
            return axios({
                method: requestAction,
                url: `/task/${url}`,
                data: data,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'dataType': 'json'
                }
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
                url: `/task/${url}`,
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

export const GET_REQUEST = (url, id, action, setError, token) => {
    return async () => {
        const fetchDate = async () => {
            return  axios({
                method: 'GET',
                url: `/task/${url}`,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        try {
            const response = await fetchDate()
            action(url, id, response.data)
        }catch (error) {
            setError(error)
        }
    }
}

export const DELETE_REQUEST = (url, id, deleteAction, setError, token) => {
    return async () => {
        const fetchDate = async () => {
            return axios({
                method: 'DELETE',
                url: `/task/${url}${id ? id : ''}`,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        try {
            const project = await fetchDate()
            console.log("Delete project", project)
            deleteAction(project.data)
        }catch (error) {
            setError(error.response.data)

        }
    }
}