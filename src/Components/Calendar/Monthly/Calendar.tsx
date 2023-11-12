import * as React from 'react';
import Header from "../../Header/Header";


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
