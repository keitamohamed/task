import axios from "axios";
import {InitialState} from "../component/interface/interface";

export const POST_REQUEST = (
    url: string,
    data: InitialState['projects'],
    action: (response: object) => void,
    setError: (error: object) => void,
    token: string) => {

    return async () => {
        const send = async () => {
            return axios({
                method: 'POST',
                url: `task/${url}`,
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
                url: `/keita${url}`,
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
