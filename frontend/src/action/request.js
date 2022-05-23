import axios from "axios";

export const SEND_REQUEST = (url, data, action, setError, token) => {

    return async () => {
        const send = async () => {
            return axios({
                method: 'POST',
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

export const UPDATE_REQUEST = (url, data, action, setError, token) => {
    return async () => {
        const send = async () => {
            return axios({
                method: 'PUT',
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
            setError(error.response.data)
        }
    }
}

export const GET_REQUEST = (url, action, setError, token) => {
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
            action(response.data)
        }catch (error) {
            setError(error.response.data)
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
            deleteAction(project.data)
        }catch (error) {
            setError(error.response.data)

        }
    }
}