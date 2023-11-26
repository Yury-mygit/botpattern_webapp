import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './students/studentSlice'
import userReducer from './userSlice' // assuming you have these slices
import sessionsReducer from './sessions/sessionSlice'
import employeesListReducer from './employee/employeeSlice'
import hourReducer from './HourSlice'
import {studentApi} from "./students/studentAPI";
import {sessionAPI} from "./sessions/sessionAPI"
import {employeeApi} from "./employee/employeeAPI";
import { setupListeners } from '@reduxjs/toolkit/query'
import employess from "../employee/Employess";


export const store = configureStore({
  reducer: {
    students: studentsReducer,
    user: userReducer,
    sessions: sessionsReducer,
    employeesList: employeesListReducer,
    hour:hourReducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [sessionAPI.reducerPath]: sessionAPI.reducer,
    [employeeApi.reducerPath]:employeeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware, sessionAPI.middleware, employeeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)