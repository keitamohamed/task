import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";

import project_slice from "./project_slice";
import taskSlice from "./task_slice";

const store = configureStore({
    reducer: {project: project_slice.reducer, task: taskSlice.reducer},
    middleware: [thunk]
})

export default store