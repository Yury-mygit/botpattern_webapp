/*
follow tasks:
Rework the timeline, instead of breaking it down into hours, it should be a continuous line, and the activity can be attached to any minute

Additionally, make a setting so that sessions can be linked not to every minute, but in increments of 5 10 15 20 30 60 minutes
*/

import * as React from 'react';
import Header from "../../Header/Header";
import {useEffect, useState} from 'react';
import Hour from '../Hour/Hour'
import AddSessionWindow from "../AddSessionWindow/AddSessionWindow";
import HourList from "./HourList";
import {getHoursLine} from "../Hour/funcLib";
import {useGetAllSessionsQuery} from "../../../store/sessions/sessionAPI";
import {SessionInterface, StudentInterface} from "../../../store/interface";
import {useGetAllStudentsQuery} from "../../../store/students/studentAPI";
import {useGetAllEmployeesQuery, useGetEmployeeByidQuery} from "../../../store/employee/employeeAPI";
import {l, lc} from '../../lib'

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

    const {data, error, isLoading} = useGetAllSessionsQuery();
    const globalSessions = data as SessionInterface[] | undefined;
    // console.log(globalSessions)

    const {data: stud, error: studEr, isLoading: il} = useGetAllStudentsQuery()
    const globalstudents = stud as StudentInterface[] | undefined

    const {data: emp, error: empEr , isLoading: empLoading} = useGetAllEmployeesQuery()
    const employeesList = emp !== undefined ? emp : []


    const handleClosePopup = () => setIsAddSessionWindowOpen(null)

    const checkSession = (date: Date): SessionInterface | undefined => {
      if (globalSessions == undefined) return undefined;

      let ses = globalSessions.find(s => new Date(s.startDateTime).getTime() === date.getTime());

      return ses ? ses : undefined;
    }

    const [isAddSessionWindowOpen, setIsAddSessionWindowOpen] = useState<SessionWindowParams|null>(null)

    const [currentWeek, setCurrentWeek] = React.useState(new Date());

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day

    const prevWeek = () => {
    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - 7));
    };

    const nextWeek = () => {
    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 7));
    };

    const startOfWeek = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - currentWeek.getDay());

    const days = [];
    for (let i = 0; i <= 6; i++) {
       days.push(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
    }

    const hours = getHoursLine();

    if (globalSessions == undefined) return (<div></div>)

    const getSession = (hour: number, day: Date): SessionInterface | undefined => {
        day.setHours(hour);
        return globalSessions.find((session: SessionInterface) => {
            const sessionDate = new Date(session.startDateTime );
            const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate(), sessionDate.getHours());
            const compareDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours());
            return sessionDay.getTime() === compareDay.getTime();
        });
    }

    const getStudent = (hour: number, day: Date ) => {
       let session = getSession(hour, day)
       let s = stud != undefined  ? stud.find(i => i.id === session?.student_id) : undefined
       return s !== undefined ? s : undefined
    }

    const getEmployees = (hour: number, day: Date ) => {
       let session = getSession(hour, day)
       let y = employeesList != undefined  ? employeesList.find(i => i.id === session?.specialist_id) : undefined
       return y !== undefined ? y : undefined
    }

    return (
      <div className="callendar_wrapper relative">
        <Header prevMonth={prevWeek} nextMonth={nextWeek} currentMonth={currentWeek}/>
        <div className="CALENDAR flex flex-row mb-16">
          <HourList hours={hours} />
          <div className="grid grid-cols-7 gap-1">
            {
              days.map((dayDate, index) => {
                dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day
                return (
                  <div className="flex flex-row" key={index}>
                    <div>
                      <div
                        key={index}
                        className={`flex flex-col w-12 h-8 border border-gray-500 items-center justify-center 
                          ${dayDate < currentDate ? 'text-gre-400' : ''} 
                          ${dayDate.getTime() === selectedDay?.getTime() ? 'bg-blue-200' : ''}
                          ${dayDate == currentDate ? 'font-bold' : ''}
                        `}
                        onClick={() => setSelectedDay(dayDate)}
                      >
                        {dayDate.getDate()}
                      </div>
                        <div className="HOUR flex flex-col">
                          {hours.map(hour => {
                            return (<Hour
                              key={`${dayDate.toString()}-${hour}`} // You have a key here
                              hour={hour}
                              date={dayDate}
                              setIsAddSessionWindowOpen={setIsAddSessionWindowOpen}
                              session = {getSession(hour, dayDate)}
                              styde = {getStudent(hour, dayDate)}
                              checkSession ={checkSession}
                            />);
                          })}
                        </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {isAddSessionWindowOpen!==null && (
            <AddSessionWindow
              handleClosePopup={handleClosePopup}
              isAddSessionWindowOpen={isAddSessionWindowOpen}
              setIsAddSessionWindowOpen={setIsAddSessionWindowOpen}
              students={globalstudents!==undefined ? globalstudents : []}
              getSession={getSession}
              getEmployees = {getEmployees}
              employeesList={employeesList}
            />
          )}
        </div>
     </div>
    );

}



