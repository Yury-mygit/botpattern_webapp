import * as React from 'react';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


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

  // const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const specialist = formData.get('specialist') as string;
  //   const time = formData.get('time') as string;
  //   setMeetings(prevMeetings => ({...prevMeetings, [selectedDay!.toISOString()]: {specialist, time}}));
  // };

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
