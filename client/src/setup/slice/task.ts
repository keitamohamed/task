import {createSlice} from "@reduxjs/toolkit";
import {TaskInitialState} from "../../interface_type/interface";


export const convertDate = (data: Date): any => {
    return new Date(
        data.getTime() -
        (data.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
}

const initialState: TaskInitialState = {
    task: {
        taskID: 0,
        summary: '',
        status: '',
        priority: '',
        dueDate: '',
        createAt: '',
        updateAt: '',
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
        newTask(state, action) {
            const task = action.payload
            state.task[task.name as keyof Object] = task.value
        },
        loadTask(state, action) {
            state.tasks = action.payload
        },
        setSelectedTask(state, action) {
            state.task = action.payload
        },
        setTaskDue(state, action) {
            state.taskDue = action.payload
        },
        setTaskDueDate(state, action) {
            const date = action.payload
            state.task[date.name as keyof Object] = convertDate(date.date)
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