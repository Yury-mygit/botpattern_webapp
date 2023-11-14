import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
    id:number;
    date: Date;
    week_first_day: Date,
    duration: number,   // in minute
    student_id: number;
    student_name: string;
    specialist_id: number;
    specialist_name: string;
    office_id: number,
    office_name: string,
    performed: boolean,
    paid: boolean;
    online: boolean;
    confirmed: boolean;
    repeatable: boolean;
    comments: string;
}
export interface Sessions extends Array<Session> {}

const initialState: Sessions = [
    {
        'id': 1001,
        'date': new Date(2023, 10, 14, 12, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "student_name": "Дуся",
        "specialist_name": "Ксения",
        'office_name': "Vivaldi",
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 1,
        "specialist_id": 1,
        "repeatable": true,
        "comments": '',
        "office_id": 1,
        "performed": true,
    },
    {
        'id': 1002,
        'date': new Date(2023, 10, 14, 13, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "student_name": "Суша",
        "specialist_name": "Ксения",
        'office_name': "Vivaldi",
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 2,
        "specialist_id": 1,
        "repeatable": true,
        "comments": '',
        "office_id": 1,
        "performed": true,
    },
    {
        'id': 1003,
        'date': new Date(2023, 10, 14, 14, 0, 0),
        'duration':30,
        'week_first_day': new Date(2023, 10, 14),
        "student_name": "Жужа",
        "specialist_name": "Ксения",
        'office_name': "Vivaldi",
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 3,
        "specialist_id": 1,
        "repeatable": true,
        "comments": '',
        "office_id": 1,
        "performed": true,
    },
]

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
 reducers: {
    addSession: (state, action: PayloadAction<Session>) => {
      state.push(action.payload);
    },
    updateSession: (state, action: PayloadAction<{ id: number; newSessionData: Partial<Session> }>) => {
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
}

);


export const { addSession, updateSession, deleteSession } = sessionsSlice.actions;

export default sessionsSlice.reducer;