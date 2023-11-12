import * as React from 'react';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";


type SessionProps = {
  selectedDay: Date | null;
  meetings: {[key: string]: {specialist: string, time: string}};
  onRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Session: React.FC<SessionProps> = ({selectedDay, meetings, onRegister}) => {
  if (!selectedDay) return null;

  return (
    <>
      <p>Dear customer, you are registering for a session on {selectedDay.toLocaleDateString()}</p>
      <form onSubmit={onRegister}>
        <label>
          Specialist:
          <input type="text" name="specialist" required />
        </label>
        <label>
          Time:
          <input type="time" name="time" required />
        </label>
        <button type="submit">Register</button>
      </form>
      {meetings[selectedDay.toISOString()] && (
        <div>
          <h2>Scheduled meeting:</h2>
          <p>Specialist: {meetings[selectedDay.toISOString()].specialist}</p>
          <p>Time: {meetings[selectedDay.toISOString()].time}</p>
        </div>
      )}
    </>
  );
};


type WeeklyCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date | null) => void;
  meetings: {[key: string]: {specialist: string, time: string}};
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({selectedDay, setSelectedDay, meetings, handleRegister}) => {
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

  const generateCalendarDays = (daysArray: Date[]) => {
    return daysArray.map((dayDate, index) => {
      dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day
      return (
        <div
            key={index}
            className={`w-12 h-12 border border-gray-500 flex items-center justify-center 
            ${dayDate < currentDate ? 'text-gray-400' : ''} ${dayDate.getTime() === selectedDay?.getTime() ? 'bg-blue-200' : ''}`}
            onClick={() => setSelectedDay(dayDate)}>
          {dayDate.getDate()}
        </div>
      );
    });
  };

  return (
    <div className="callendar_wrapper w-96">
      <Header prevMonth={prevWeek} nextMonth={nextWeek} currentMonth={currentWeek}/>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays(days)}
      </div>
      <Session selectedDay={selectedDay} meetings={meetings} onRegister={handleRegister} />
      <Footer />
    </div>
  );
}
