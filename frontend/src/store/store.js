import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";

import project_slice from "./project_slice";

const store = configureStore({
    reducer: {project: project_slice.reducer},
    middleware: [thunk]
})

export default store