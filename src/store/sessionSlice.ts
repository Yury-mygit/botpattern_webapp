import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SessionsListInterface, SessionInterface} from "./interface";

const initialState: SessionsListInterface = [
    {
        'id': 1001,
        'startDateTime': new Date(2023, 10, 14, 13, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 2,
        "specialist_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
    },
    {
        'id': 1002,
        'startDateTime': new Date(2023, 10, 14, 13, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 2,
        "specialist_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
    },
    {
        'id': 1003,
        'startDateTime': new Date(2023, 10, 14, 13, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 2,
        "specialist_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
    },
]

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<SessionInterface>) => {
      state.push(action.payload);
    },
    updateSession: (state, action: PayloadAction<{ id: number; newSessionData: Partial<SessionInterface> }>) => {
      const sessionIndex = state.findIndex(session => session.id === action.payload.id);
      if (sessionIndex !== -1) {
        state[sessionIndex] = { ...state[sessionIndex], ...action.payload.newSessionData };
      }
    },
    deleteSession: (state, action: PayloadAction<number>) => {
      const sessionIndex = state.findIndex(session => session.id === action.payload);
      if (sessionIndex !== -1) {
        state.splice(sessionIndex, 1);
      }
    },
  },
});

export const { addSession, updateSession, deleteSession } = sessionsSlice.actions;

export default sessionsSlice.reducer;
