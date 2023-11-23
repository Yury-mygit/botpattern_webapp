import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './students/studentSlice'
import userReducer from './userSlice' // assuming you have these slices
import sessionsReducer from './sessions/sessionSlice'
import employeesListReducer from './employee/employeeSlice'
import hourReducer from './HourSlice'
import {studentApi} from "./students/QueryStydents";
import {sessionAPI} from "./sessions/sessionAPI"
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
  reducer: {
    students: studentsReducer,
    user: userReducer,
    sessions: sessionsReducer,
    employeesList: employeesListReducer,
    hour:hourReducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [sessionAPI.reducerPath]: sessionAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware, sessionAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)