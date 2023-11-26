import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../store";
import {SessionInterface} from "./sessionSlice";

export const selectSessions = (state: RootState) => state.sessions;

export const getAllSessionOnWeek = createSelector(
  selectSessions,
  (state: RootState, startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return { startOfWeek, endOfWeek };
  },
  (sessions: SessionInterface[], { startOfWeek, endOfWeek }) =>
    sessions.filter(session => {



        return new Date(session.startDateTime) >= startOfWeek && new Date(session.startDateTime) < endOfWeek

    }

    )
);

export const getSessionById = createSelector(
  selectSessions,
  (state: RootState, sessionId: number) => sessionId,
  (sessions: SessionInterface[], sessionId) => sessions.find(session => session.id === sessionId)
);



export const getSessionByDate = createSelector(
    selectSessions,
    (state: RootState, date: Date) => date,
    (sessions: SessionInterface[], date) => sessions.find(session =>{

        const Idate = new Date(session.startDateTime)

        let a = JSON.stringify(new Date(2023, 10, 14, 13, 0, 0))

        return (
            Idate.getMinutes() === date.getMinutes() &&
            Idate.getHours() === date.getHours() &&
            Idate.getDate() === date.getDate() &&
            Idate.getMonth() === date.getMonth() &&
            Idate.getFullYear() === date.getFullYear()
        )
    }

    )
);
//"2023-11-14T10:00:00.000Z"
//"2023-11-14T10:00:00.000Z"