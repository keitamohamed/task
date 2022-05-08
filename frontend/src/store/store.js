import {configureStore, combineReducers} from '@reduxjs/toolkit'
import thunk from "redux-thunk";

import project_slice from "./project_slice";
import taskSlice from "./task_slice";


const combinedReducer = combineReducers({
    project: project_slice.reducer,
    task: taskSlice.reducer
})

const rootReducer = (state, action) => {
  if (action.type === 'project/logout') {
      state = undefined
  }
  return combinedReducer(state, action)
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export default store