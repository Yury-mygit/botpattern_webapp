// @flow
import * as React from 'react';
import {StudentInterface} from "../store/interface";

interface LineProps {
  item: extended;
  key: string | number;
}

interface extended extends StudentInterface{
  session_available: number
}

const Line: React.FC<LineProps> = ({ item }) => {
  console.log(item)
  return (
    <div className="flex flex-row justify-between">

      <div className="flex flex-row justify-center w-2/4 border-2"> { item.first_name } {item.last_name} </div>
      <div className="flex flex-row justify-center w-1/4 border-2"> {item.status} </div>
      <div className="flex flex-row justify-center w-1/4 border-2"> {item.session_available} </div>

    </div>
  );
};

export default Line