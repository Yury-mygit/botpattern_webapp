import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ServiceType} from "../interface";

export interface SessionInterface {
  id: number;
  startDateTime: string;
  duration: number; // in minute
  week_first_day: string;
  student_id: number; // ID of the Student
  employee_id: number; // ID of the Specialist
  office_id: number; // ID of the Office
  // serviceType: ServiceType;
  serviceType: number;
  performed: boolean;
  paid: boolean;
  online: boolean;
  confirmed: boolean;
  repeatable: boolean;
  notes: string;
  status: string; // Could be an enum if there's a fixed set of statuses
}

export interface SessionInterfaceCrete {

  startDateTime: string;
  duration: number; // in minute
  week_first_day: string;
  student_id: number; // ID of the Student
  employee_id: number; // ID of the Specialist
  office_id: number; // ID of the Office
  // serviceType: ServiceType;
  serviceType: number;
  performed: boolean;
  paid: boolean;
  online: boolean;
  confirmed: boolean;
  repeatable: boolean;
  notes: string;
  status: string; // Could be an enum if there's a fixed set of statuses
}

const initialState: SessionInterface[] = [
    {
        'id': 1001,
        'startDateTime': new Date(2023, 10, 14, 13, 0, 0).toString(),
        'duration':30,
        'week_first_day': new Date(2023, 10, 13,0,0,0).toString(),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 1,
        "employee_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
    },
    {
        'id': 1002,
        'startDateTime': new Date(2023, 10, 14, 14, 0, 0).toString(),
        'duration':30,
        'week_first_day':  new Date(  2023, 10, 13,0,0,0).toString(),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 2,
        "employee_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
    },
    {
        'id': 1003,
        'startDateTime':  new Date( 2023, 10, 14, 15, 0, 0).toString(),
        'duration':30,
        'week_first_day':  new Date( 2023, 10, 13,0,0,0).toString(),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": 3,
        "employee_id": 1,
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
        console.log(action.payload)
      state.push(action.payload);
    },

    updateSession: (state, action: PayloadAction<{ id: number; newSessionData: Partial<SessionInterface> }>) => {
      const sessionIndex = state.findIndex(session => session.id === action.payload.id);
      if (sessionIndex !== -1) {
        const newSessionData = { ...action.payload.newSessionData };
        state[sessionIndex] = { ...state[sessionIndex], ...newSessionData };
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
