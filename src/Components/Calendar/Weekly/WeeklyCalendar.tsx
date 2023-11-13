import * as React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import type {RootState } from "../../../store/store";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/userSlice'
import {useEffect, useState} from 'react';
import { FaDollarSign, FaVideo, FaRetweet } from 'react-icons/fa';
type WeeklyCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date | null) => void;
  meetings: {[key: string]: {specialist: string, time: string}};
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};



export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({selectedDay, setSelectedDay, meetings, handleRegister}) => {

  const [sessions, setSessions] = useState<Sessions>({

    "14.11.2023":[
        {
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


const getEvent = (date: Date, hour: number): Session | null => {
      const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      const session = sessions[dateString]?.find((session: Session) => parseInt(session.time.split(' ')[0]) === hour);
      return session || null;
  }

    useEffect(() => {
        console.log(sessions)
    }, [sessions]);


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
const url = "https://customer.freedompay.money/v1/merchant/545158/card/payment?pg_payment_id=8843482fc7534fe4ffd4fef11a72fc2d";




type HourProps = {
  hour: number;
  date: Date;
  event: Event | null;
  sessions: Sessions;
  setSessions: React.Dispatch<React.SetStateAction<Sessions>>;
  getEvent: (date: Date, hour: number) => Session | null;
};




const Hour: React.FC<HourProps> = ({ hour, date, event, sessions, setSessions, getEvent }) => {

      const handleDragStart = (e: React.DragEvent) => {
          const dragData = {
                event,
                originalDate: date,
                originalHour: hour
          };
          e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
      };

   const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  const dragData = JSON.parse(e.dataTransfer.getData('text/plain')) as {event: Session, originalDate: Date, originalHour: number};
  const droppedEvent = dragData.event;
  const originalDateObject = new Date(dragData.originalDate);
  const originalDate = `${originalDateObject.getDate()}.${originalDateObject.getMonth() + 1}.${originalDateObject.getFullYear()}`;

  const originalHour = dragData.originalHour;
  const originalDaySessions = sessions[originalDate];
  const updatedOriginalDaySessions = originalDaySessions.filter((session: Session) => parseInt(session.time.split(' ')[0]) !== originalHour);

  // Add the dropped event to the target date and hour
  const targetDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const targetDaySessions = sessions[targetDate] || [];
  const targetEvent = getEvent(date, hour);

  const updatedTargetDaySessions = targetDaySessions.map((session: Session) => {
    if (parseInt(session.time.split(' ')[0]) === hour) {
      return {...droppedEvent, time: `${hour} 00`};
    }
    return session;
  });

  if (!targetEvent) {
    updatedTargetDaySessions.push({...droppedEvent, time: `${hour} 00`});
  }

  setSessions(prevSessions => {
    const newSessions = { ...prevSessions };
    newSessions[originalDate] = updatedOriginalDaySessions;
    if (targetEvent) {
      newSessions[originalDate].push({...targetEvent, time: `${originalHour} 00`});
    }
    newSessions[targetDate] = updatedTargetDaySessions;
    return newSessions;
  });
};


    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };
return (
  <div
    key={hour}
    className='border w-12 h-8 text-xs flex justify-center items-center relative' // Increase height to h-12
    draggable={event !== null}
    onDragStart={handleDragStart}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    {event &&
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row', // Change to row
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', // Add width
      }}>
        <FaDollarSign style={{
          color: event.paid ? 'green' : 'red'
        }}/>
        <FaVideo style={{
          color: event.online ? 'blue' : 'gray'
        }}/>
        <FaRetweet style={{
          color: event.repeatable ? 'orange' : 'gray'
        }}/>
      </div>
    }
    <p className="mt-2">{event === null ? "" : `${event.student} `}</p>
  </div>
);
};



type Event = {
  student: string;
  specialist: string;
  online: boolean;
  paid: boolean;
  confirmed: boolean;
  session_id: number;
  student_id: number;
  specialist_id: number;
  repeatable: boolean;
};

type Session = Event & {
  time: string;

};

type Sessions = {
  [date: string]: Session[];
};




const [showIframe, setShowIframe] = useState(false);
    const generateCalendarDays = (daysArray: Date[]) => {
        return daysArray.map((dayDate, index) => {
            dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day

            return (
                <div className="flex flex-row">

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
                              const event = getEvent(dayDate, hour);
                              return (<Hour
                                  key={`${dayDate.toString()}-${hour}`} // You have a key here
                                  hour={hour}
                                  date={dayDate}
                                  event={event}
                                  sessions={sessions}
                                  setSessions={setSessions}
                                  getEvent={getEvent}
                              />);
                            })}
                       </div>
                    </div>
                </div>
            );
        });
    };

 return (
  <div className="callendar_wrapper w-96 ">
    <Header prevMonth={prevWeek} nextMonth={nextWeek} currentMonth={currentWeek}/>
    <div className="CALENDAR flex flex-row mb-16">
      <div className="pt-5 w-8 h-8">
        {hours.map(hour => (
          <div key={hour} className="h-8">{hour}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays(days)}
      </div>
    </div>
  </div>
);
}



