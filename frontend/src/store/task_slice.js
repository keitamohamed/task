import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    task: {},
    tasks: [],
    taskDue: [],
    message: null,
    error: null
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        loadTask(state, action) {
            state.tasks = action.payload
        },
        setTaskDue(state, action) {
            state.taskDue = action.payload
        },
        setMessage(state, action){
            state.message = action.payload.message
        },
        setError(state, action) {
            state.error = action.payload.error
        },
        reSetError(state){
            state.error = null
        }
    }
})

export const taskAction = taskSlice.actions
export default taskSlice