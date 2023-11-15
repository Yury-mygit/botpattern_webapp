import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "./store";

// ...
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
export const selectSessions = (state: RootState) => state.sessions;

export const getAllSessionOnWeek = createSelector(
  selectSessions,
  (state: RootState, startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return { startOfWeek, endOfWeek };
  },
  (sessions: Sessions, { startOfWeek, endOfWeek }) =>
    sessions.filter(session =>
      session.date >= startOfWeek && session.date < endOfWeek
    )
);

export const getSessionById = createSelector(
  selectSessions,
  (state: RootState, sessionId: number) => sessionId,
  (sessions: Sessions, sessionId) => sessions.find(session => session.id === sessionId)
);
