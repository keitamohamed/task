import {createSlice} from "@reduxjs/toolkit";
import {InitialState} from "../../interface_type/interface";

const setProject: InitialState['project'] = {
    name: '',
    identifier: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
}

const initialState: InitialState = {
    project: {
        name: '',
        identifier: '',
        description: '',
        startDate: new Date,
        endDate: new Date,
    },
    projects: [],
    message: '',
    error: {}
}

const convertDate = (data: Date): any => {
    return new Date(
        data.getTime() -
        (data.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
}

const projectSlice = createSlice( {
    name: 'project',
    initialState,
    reducers: {
        loadProject(state, action) {
            state.projects = action.payload;
        },
        selectedProject(state, action) {
            state.project = action.payload;
        },
        addNewProject(state, action ) {
            const project = action.payload
            console.log(project.name);
            state.project[project.name as keyof Object] = project.value
        },
        updateProject(state, action){
            const inputValue = action.payload
            state.project[inputValue.name as keyof Object] = inputValue.value;
        },
        initialProject(state) {
            state.project = setProject
        },
        setDate(state, action)  {
            const date = action.payload;
            state.project[date.name as keyof Object] = convertDate(date.value)
        },
        logout: (state) => {
            state.project = setProject
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        setError(state, action) {
            state.error = action.payload.error;
        }
    }
})

export const projectAction = projectSlice.actions
export default projectSlice;