import {createSlice} from "@reduxjs/toolkit";

const setProject = {
    name: '',
    identifier: '',
    description: '',
    startDate: null,
    endDate: null,
}

const initialState = {
    project: {},
    projects: [],
    message: null,
    error: null
}

const convertDate = data => {
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
            state.project[project.name] = project.value
        },
        updateProject(state, action){
            const inputValue = action.payload
            state.project[inputValue.name] = inputValue.value;
        },
        initialProject(state) {
            state.project = setProject
        },
        setDate(state, action)  {
            const date = action.payload;
            state.project[date.name] = (convertDate(date.value))
        },
        logout: state => {
            state.value = '/logout'
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