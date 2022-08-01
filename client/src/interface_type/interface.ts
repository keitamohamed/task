import {ReactNode} from "react";

export interface InitialState {
    project: {
        name: string,
        identifier: string,
        description: string,
        startDate: Date,
        endDate: Date,
    }
    projects: Object[]
    message: string,
    error: string
}

export interface CredentialsType {
    accessToken: string,
    name: string,
    userID: string,
    email: string
    code: string
}

export interface Login {
    email: string
    password: string
}

export interface CredError {
    firstName: string,
    lastName: string,
    message: string,
    auth: {
        email: string,
        password: string
    }
}

export interface Props {
    children?: ReactNode
}