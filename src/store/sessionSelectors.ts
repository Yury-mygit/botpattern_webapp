import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "./store";
import {SessionsListInterface, SessionInterface} from "./interface";

export const selectSessions = (state: RootState) => state.sessions;

export const getAllSessionOnWeek = createSelector(
  selectSessions,
  (state: RootState, startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return { startOfWeek, endOfWeek };
  },
  (sessions: SessionsListInterface, { startOfWeek, endOfWeek }) =>
    sessions.filter(session =>
      session.startDateTime >= startOfWeek && session.startDateTime < endOfWeek
    )
);

export const getSessionById = createSelector(
  selectSessions,
  (state: RootState, sessionId: number) => sessionId,
  (sessions: SessionsListInterface, sessionId) => sessions.find(session => session.id === sessionId)
);

export const getSessionByDate = createSelector(
    selectSessions,
    (state: RootState, date: Date) => date,
    (sessions: SessionsListInterface, date) => sessions.find(session =>
        session.startDateTime.getMinutes() === date.getMinutes() &&
        session.startDateTime.getHours() === date.getHours() &&
        session.startDateTime.getDate() === date.getDate() &&
        session.startDateTime.getMonth() === date.getMonth() &&
        session.startDateTime.getFullYear() === date.getFullYear()
    )
);
