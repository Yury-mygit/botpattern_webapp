/*
follow tasks:
Rework the timeline, instead of breaking it down into hours, it should be a continuous line, and the activity can be attached to any minute

Additionally, make a setting so that sessions can be linked not to every minute, but in increments of 5 10 15 20 30 60 minutes
*/

import * as React from 'react';
import Header from "../../Header/Header";
import Footer from "../../../Footer/Footer";
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

    const handleClosePopup = () => setIsAddSessionWindowOpen(null)

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
                              return (<Hour
                                  key={`${dayDate.toString()}-${hour}`} // You have a key here
                                  hour={hour}
                                  date={dayDate}
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
      <div className="
        callendar_wrapper
        {/*w-96*/}
        relative
      ">
        <Header prevMonth={prevWeek} nextMonth={nextWeek} currentMonth={currentWeek}/>
        <div className="CALENDAR flex flex-row mb-16">
          <HourList hours={hours} />
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays(days)}
          </div>
            {isAddSessionWindowOpen!==null && (
              <AddSessionWindow
                  handleClosePopup={handleClosePopup}
                  isAddSessionWindowOpen={isAddSessionWindowOpen}
                  setIsAddSessionWindowOpen={setIsAddSessionWindowOpen}
              />
            )}

        </div>
      </div>
    );
}



