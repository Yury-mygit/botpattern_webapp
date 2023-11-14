import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import sessionsReducer from '../store/sessionSlice';

export const store = configureStore({
  reducer: {
      user: userSlice,
      sessions: sessionsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



export const selectSessions = (state: RootState) => state.sessions;

export const getAllSessionOnWeek = createSelector(
  selectSessions,
  (_, startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return { startOfWeek, endOfWeek };
  },
  (sessions, { startOfWeek, endOfWeek }) =>
    sessions.filter(session =>
      session.date >= startOfWeek && session.date < endOfWeek
    )
);

export const getSessionById = createSelector(
  selectSessions,
  (_, sessionId: number) => sessionId,
  (sessions, sessionId) => sessions.find(session => session.id === sessionId)
);