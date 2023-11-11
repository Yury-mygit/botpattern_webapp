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

export function Calendar() {
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


prevMonthDays.concat(days).concat(nextMonthDays).map((day, index) => {
  const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  dayDate.setHours(0, 0, 0, 0);
  console.log(currentMonth);
  return '';
});

const generateCalendarDays = (daysArray: number[], monthOffset: number) => {
    return daysArray.map((day, index) => {
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day);
      dayDate.setHours(0, 0, 0, 0); // Normalize to compare only year, month, and day
      return (
        <div
            key={index}
            className={`w-12 h-12 border border-gray-500 flex items-center justify-center 
            ${dayDate < currentDate ? 'text-gray-400' : ''}`}>
          {day}
        </div>
      );
    });
  };

 return (
    <div className="callendar_wrapper w-96">
      <Header prevMonth={prevMonth} nextMonth={nextMonth} currentMonth={currentMonth}/>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays(prevMonthDays, -1)}
        {generateCalendarDays(days, 0)}
        {generateCalendarDays(nextMonthDays, 1)}
      </div>
      <Footer />
    </div>
  );


}
