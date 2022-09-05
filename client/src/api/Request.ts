import axios from "axios";
import {InitialState} from "../interface_type/interface";


export const LOGIN_REQUEST = (
    data: {email: string, password: string},
    action: (response: object) => void,
    setError: (error: object) => void,
    ) => {
    return async () => {
        axios.defaults.url = 'http://localhost:8080'
        const send = async () => {
            return axios({
                method: 'POST',
                url: `task/login`,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        try {
            const response = await send()
            action(response.data)
        }catch (error) {
            setError(error.response?.data)
        }
    }
}

export const POST_REQUEST = (
    url: string,
    data: InitialState['projects'],
    action: (response: object) => void,
    setError: (error: object) => void,
    token: string) => {
    return async () => {
        axios.defaults.url = 'http://localhost:8080'
        const send = async () => {
            return axios({
                method: 'POST',
                url: `task/${url}`,
                data: data,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json'
                }
            });
        }

        try {
            const response = await send()
            action(response.data)
        }catch (error) {
            setError(error.response?.data)
        }
    }
}

export const GET_REQUEST = (
    token: string,
    url: string,
    action: (data: object) => void,
    setError: (error: any) => void,
    ) => {

    return async () => {
        const fetch = async () => {
            return axios({
                method: "GET",
                url: `task/${url}`,
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        try {
            const response = await fetch();
            action(response.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
}

export const UPDATE_REQUEST = (
    url: string,
    data: object,
    action: (data: object) => void,
    setError: (error: object) => void) => {

    return async () => {
        const send = async () => {
            return axios({
                method: "PUT",
                url: `task/${url}`,
                data: data,
                headers: {
                    Authorization: 'Bearer',
                    'Content-Type': 'application/json'
                }
            })
        }
        try {
            const response = await send();
            action(response.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
}

export const DELETE_REQUEST = (
    token: string,
    url: string,
    deleteAction: (data: object) => void,
    setError: (error: any) => void,
    ) => {

    return async () => {
        const sendRequest = async () => {
            return axios({
                method: "DELETE",
                url: `task/${url}`,
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        try {
            const response = await sendRequest();
            console.log(response.data)
            deleteAction(response.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
}
