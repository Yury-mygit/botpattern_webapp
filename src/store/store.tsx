import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './studentSlice'
import userReducer from './userSlice' // assuming you have these slices
import sessionsReducer from './sessionSlice'

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    user: userReducer,
    sessions: sessionsReducer,
    // other reducers...
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
