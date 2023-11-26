// @flow
import * as React from 'react';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {IconButton} from "../iconButton/IconButto";

type HeaderProps = {
  prevMonth: () => void;
  nextMonth: () => void;
  currentMonth: Date;
};

const Header: React.FC<HeaderProps> = ({ prevMonth, nextMonth, currentMonth }) => (
  <div className="header flex justify-between items-center">
    <div>
      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </div>
    <div>
    <IconButton onClick={prevMonth}>
      <FaArrowLeft color="black" />
    </IconButton>
    <IconButton onClick={nextMonth}>
      <FaArrowRight color="black" />
    </IconButton>
    </div>
  </div>
);

export default Header