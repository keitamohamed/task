import {createSlice} from "@reduxjs/toolkit";
import {TaskInitialState} from "../../interface_type/interface";


const initialState: TaskInitialState = {
    task: {
        summary: '',
        status: '',
        priority: '',
        dueDate: new Date(),
        createAt: new Date(),
        updateAt: new Date(),
    },
    tasks: [],
    taskDue: [],
    message: {},
    error: {}
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
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload.error
        },
        reSetMessage(state){
            state.message = {}
        },
        reSetError(state){
            state.error = {}
        }
    }
})

export const taskAction = taskSlice.actions;
export default taskSlice