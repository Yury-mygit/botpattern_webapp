import * as React from 'react';
import { FaBeer } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type HeaderProps = {
  prevMonth: () => void;
  nextMonth: () => void;
  currentMonth: Date;
};

type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode; // Add this line
};

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className="box-border border-2 border-transparent hover:border-blue-500 text-white font-bold py-2 px-4 rounded">
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ prevMonth, nextMonth, currentMonth }) => (
  <div className="header flex justify-between items-center">
    <div>
      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </div>
    <div>
      <IconButton onClick={prevMonth}>
        <FaArrowLeft />
      </IconButton>
      <IconButton onClick={nextMonth}>
        <FaArrowRight />
      </IconButton>
    </div>
  </div>
);

type FooterProps = {

}
const Footer: React.FC<FooterProps> = ({})=>{
return(<div>Footer</div>)
}



// In MonthlyCalendar.tsx
type MonthlyCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date | null) => void;
  meetings: {[key: string]: {specialist: string, time: string}};
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};


export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({selectedDay, setSelectedDay, meetings, handleRegister}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());


  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonthDays = [];
  for (let i = daysInPrevMonth - firstDayOfWeek + 1; i <= daysInPrevMonth; i++) {
    prevMonthDays.push(i);
  }

  const nextMonthDays = [];
  for (let i = 1; i <= 42 - firstDayOfWeek - daysInMonth; i++) {
    nextMonthDays.push(i);
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day

  // const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  // const [meetings, setMeetings] = React.useState<{[key: string]: {specialist: string, time: string}}>({});

  const generateCalendarDays = (daysArray: number[], monthOffset: number) => {
    return daysArray.map((day, index) => {
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day);
      dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day
      return (
        <div
            key={index}
            className={`w-12 h-12 border border-gray-500 flex items-center justify-center 
            ${dayDate < currentDate ? 'text-gray-400' : ''} ${dayDate.getTime() === selectedDay?.getTime() ? 'bg-blue-200' : ''}`}
            onClick={() => setSelectedDay(dayDate)}>
          {day}
        </div>
      );
    });
  };

    // const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const specialist = formData.get('specialist') as string;
    // const time = formData.get('time') as string;
    // setMeetings(prevMeetings => ({...prevMeetings, [selectedDay!.toISOString()]: {specialist, time}}));
  // };

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


return (
    <div className="callendar_wrapper w-96">
      <Header prevMonth={prevMonth} nextMonth={nextMonth} currentMonth={currentMonth}/>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays(prevMonthDays, -1)}
        {generateCalendarDays(days, 0)}
        {generateCalendarDays(nextMonthDays, 1)}
      </div>
      <Session selectedDay={selectedDay} meetings={meetings} onRegister={handleRegister} />
      <Footer />
    </div>
  );
}
