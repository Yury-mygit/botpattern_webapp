import * as React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import type {RootState } from "../../../store/store";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/userSlice'
import {useEffect, useState} from 'react';

import { FaDollarSign, FaVideo, FaRetweet } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

import {Session, Sessions} from "../Interfases";
import Hour from '../Hour/Hour'
import AddSessionWindow from "../AddSessionWindow/AddSessionWindow";
import HourList from "./HourList";

type WeeklyCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date | null) => void;
  meetings: {[key: string]: {specialist: string, time: string}};
  handleRegister: (session: React.FormEvent<HTMLFormElement>) => void;
};



export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({selectedDay, setSelectedDay, meetings, handleRegister}) => {


    interface SessionWindowParams {
      hour: number;
      date: Date;
    }

    const handleClosePopup = () => {
      setIsAddSessionWindowOpen(null);
    };

    const [isAddSessionWindowOpen, setIsAddSessionWindowOpen] = useState<SessionWindowParams|null>(null)

    const [sessions, setSessions] = useState<Sessions>({

    "14.11.2023":[
        {
          'id': 1001,
          'time': "12 00",
          "student": "Дуся",
          "specialist": "Ксения",
          "online": false,
          "paid": true,
          "confirmed": true,
          "session_id": 1,
          "student_id": 1,
          "specialist_id": 1,
          "repeatable": false,
        },
        {
            'id': 1002,
            'time':"13 00",
            "student": "Суша",
            "specialist": "Ксения",
            "online": false,
            "paid": true,
            "confirmed": true,
            "session_id": 1,
          "student_id": 1,
          "specialist_id": 1,
          "repeatable": false,
        },
        {
            'id': 1003,
            'time':"14 00",
            "student": "Саша",
            "specialist": "Ксения",
            "online": false,
            "paid": true,
            "confirmed": true,
            "session_id": 1,
          "student_id": 1,
          "specialist_id": 1,
          "repeatable": false,
        },
    ],
    "17.11.2023":[
    {
        'id': 1005,
        'time': "9 00",
        "student": "Дуся",
        "specialist": "Ксения",
        "online": false,
        "paid": false,
        "confirmed": true,
        "session_id": 1,
      "student_id": 1,
      "specialist_id": 1,
      "repeatable": false,
    },
    {
        'id': 1006,
        'time':"12 00",
        "student": "Суша",
        "specialist": "Ксения",
        "online": false,
        "paid": true,
        "confirmed": true,
        "session_id": 1,
      "student_id": 1,
      "specialist_id": 1,
      "repeatable": false,
    },
    {
        'id': 1007,
        'time':"15 00",
        "student": "Саша",
        "specialist": "Ксения",
        "online": true,
        "paid": true,
        "confirmed": true,
        "session_id": 1,
      "student_id": 1,
      "specialist_id": 1,
      "repeatable": true,
    },
    ]
    })

    const getStudents = (sessions:Sessions): string[] => {
      const students = new Set<string>();

      // Iterate over all dates
      for (const date in sessions) {
        // Iterate over all sessions on this date
        for (const session of sessions[date]) {
          students.add(session.student);
        }
      }

      return Array.from(students);
    };

    const getSpecialists = (sessions:Sessions): string[] => {
      const specialists = new Set<string>();

      // Iterate over all dates
      for (const date in sessions) {
        // Iterate over all sessions on this date
        for (const session of sessions[date]) {
          specialists.add(session.specialist);
        }
      }

      return Array.from(specialists);
    };

    const getSession = (date: Date, hour: number): Session | null => {
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const session = sessions[dateString]?.find((session: Session) => parseInt(session.time.split(' ')[0]) === hour);
        return session || null;
    }

    const addSession = (date: Date, time: string, student: string, specialist: string, online: boolean, paid: boolean, confirmed: boolean, sessionId: number, studentId: number, specialistId: number, repeatable: boolean) => {
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        // Create a new session object
        const newSession: Session = {
            id: Date.now(), // Use the current timestamp as a unique ID
            time,
            student,
            specialist,
            online,
            paid,
            confirmed,
            session_id: sessionId,
            student_id: studentId,
            specialist_id: specialistId,
            repeatable,
        };

        // Add the new session to the sessions state
        setSessions(prevSessions => ({
            ...prevSessions,
            [dateString]: prevSessions[dateString] ? [...prevSessions[dateString], newSession] : [newSession],
        }));
    };

    const updateSession = (id: number, newSessionData: Partial<Session>) => {
      // Iterate over all dates
      for (const date in sessions) {
        // Find the session with the given ID
        const sessionIndex = sessions[date].findIndex(session => session.id === id);

        if (sessionIndex !== -1) {
          // Update the session data
          const updatedSession = { ...sessions[date][sessionIndex], ...newSessionData };

          // Set the updated sessions back to the state
          setSessions(prevSessions => ({
            ...prevSessions,
            [date]: [
              ...prevSessions[date].slice(0, sessionIndex),
              updatedSession,
              ...prevSessions[date].slice(sessionIndex + 1),
            ],
          }));

          break;
        }
      }
    };

    const count = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const [currentWeek, setCurrentWeek] = React.useState(new Date());
    // const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
    // const [meetings, setMeetings] = React.useState<{[key: string]: {specialist: string, time: string}}>({});

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day

    const prevWeek = () => {
    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - 7));
    };

    const nextWeek = () => {
    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 7));
    };

    const startOfWeek = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - currentWeek.getDay());
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);

    const days = [];
    for (let i = 0; i <= 6; i++) {
    days.push(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
    }

    function generateHours() {
        const hours = [];
        for (let i = 8; i <= 21; i++) {
            hours.push(i);
        }
        return hours;
    }

    const hours = generateHours();
    const generateCalendarDays = (daysArray: Date[]) => {
        return daysArray.map((dayDate, index) => {
            dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day

            return (
                <div className="flex flex-row" key={index}>

                    <div>
                        <div
                            key={index}
                            className={`flex flex-col w-12 h-8 border border-gray-500 items-center justify-center 
                            ${dayDate < currentDate ? 'text-gray-400' : ''} ${dayDate.getTime() === selectedDay?.getTime() ? 'bg-blue-200' : ''}`}
                            onClick={() => setSelectedDay(dayDate)}
                        >
                            {dayDate.getDate()}
                        </div>

                       <div className="HOUR flex flex-col">
                            {hours.map(hour => {
                              const session = getSession(dayDate, hour);
                              return (<Hour
                                  key={`${dayDate.toString()}-${hour}`} // You have a key here
                                  hour={hour}
                                  date={dayDate}
                                  session={session}
                                  sessions={sessions}
                                  setSessions={setSessions}
                                  getSession={getSession}
                                  setIsAddSessionWindowOpen={setIsAddSessionWindowOpen}
                              />);
                            })}
                       </div>
                    </div>
                </div>
            );
        });
    };

    return (
      <div className="callendar_wrapper w-96 relative">
        <Header prevMonth={prevWeek} nextMonth={nextWeek} currentMonth={currentWeek}/>
        <div className="CALENDAR flex flex-row mb-16">
          <HourList hours={hours} />
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays(days)}
          </div>
            {isAddSessionWindowOpen!==null && (
              <AddSessionWindow
                  handleClosePopup={handleClosePopup}
                  addSession={addSession}
                  updateSession={updateSession}
                  getSession={getSession}
                  isAddSessionWindowOpen={isAddSessionWindowOpen}
                  setIsAddSessionWindowOpen={setIsAddSessionWindowOpen}
                  students={getStudents(sessions)}
                  specialists={ getSpecialists(sessions) }
              />
            )}

        </div>
      </div>
    );
}



