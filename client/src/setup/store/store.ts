import {configureStore, combineReducers, AnyAction} from "@reduxjs/toolkit"
import thunk from "redux-thunk";

import projectSlice from "../slice/project";
import taskSlice from "../slice/task";

const reducers = combineReducers({
    project: projectSlice.reducer,
    task: taskSlice.reducer
})

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === '/logout') {
      state = undefined
  }
  return reducers(state, action)
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;