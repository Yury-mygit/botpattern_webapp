import * as React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import type {RootState } from "../../../store/store";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/userSlice'
import { useState } from 'react';

type WeeklyCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date | null) => void;
  meetings: {[key: string]: {specialist: string, time: string}};
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({selectedDay, setSelectedDay, meetings, handleRegister}) => {

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
  for (let i = 8; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
}

const hours = generateHours();
const url = "https://customer.freedompay.money/v1/merchant/545158/card/payment?pg_payment_id=8843482fc7534fe4ffd4fef11a72fc2d";




type HourProps = {
  hour: number;
  event: Event | null;
};

const Hour: React.FC<HourProps> = ({ hour, event }) => (
  <div key={hour} className='border w-12 h-8 text-xs'>
    {event === null ? "" : `${event.student} `}
  </div>
);



type Event = {
  student: string;
  specialist: string;
  online: boolean;
  paid: boolean;
  confirmed: boolean;
};

type Session = Event & {
  time: string;
};

type Sessions = {
  [date: string]: Session[];
};
const getEvent = (date: Date, hour: number): Session | null => {
  const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const session = sessions[dateString]?.find(session => parseInt(session.time.split(' ')[0]) === hour);
  return session || null;
}


let sessions: Sessions = {
    "14.11.2023":[
        {
            'time': "12 00",
            "student": "Дуся",
            "specialist": "Ксения",
            "online": false,
            "paid": true,
            "confirmed": true,
        },
        {
            'time':"13 00",
            "student": "Суша",
            "specialist": "Ксения",
            "online": false,
            "paid": true,
            "confirmed": true,
        },
        {
            'time':"14 00",
            "student": "Саша",
            "specialist": "Ксения",
            "online": false,
            "paid": true,
            "confirmed": true,
        },
    ]
}



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
                          return <Hour hour={hour} event={event} />;
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
        <div className="pt-7 w-10 h-8">
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




//  {/*{count.id}*/}
//       <Footer />
//
//          <button onClick={() => setShowIframe(!showIframe)}>
//         {showIframe ? 'Закрыть' : 'Оплатить'}
//       </button>
//
//       {showIframe && <iframe src={url} title="Payment Frame" style={{width: '100%', height: '600px'}}></iframe>}