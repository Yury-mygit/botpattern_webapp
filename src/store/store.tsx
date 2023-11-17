import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './students/studentSlice'
import userReducer from './userSlice' // assuming you have these slices
import sessionsReducer from './sessions/sessionSlice'
import employeesListReducer from './employee/employeeSlice'

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    user: userReducer,
    sessions: sessionsReducer,
    employeesList: employeesListReducer
    // other reducers...
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
