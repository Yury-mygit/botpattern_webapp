// @flow
import * as React from 'react';
import {Session, Sessions} from "../Interfases";
import {FaDollarSign, FaRetweet, FaVideo} from "react-icons/fa";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {getSessionByDate} from '../../../store/sessionSelectors'
import {SessionsListInterface, SessionInterface} from "../../../store/interface";
import {RootState} from "../../../store/store";


interface SessionWindowParams {
  hour: number;
  date: Date;
}

interface Props  {
  hour: number;
  date: Date;
  session: Session | null;
  sessions: Sessions;
  setSessions: React.Dispatch<React.SetStateAction<Sessions>>;
  getSession: (date: Date, hour: number) => Session | null;
  setIsAddSessionWindowOpen: (params: SessionWindowParams) => void; // Use the SessionWindowParams type here
}

export const Hour: React.FC<Props> = ({
                          hour,
                          date,
                          session,
                          sessions,
                          setSessions,
                          getSession,
                          setIsAddSessionWindowOpen
      }) => {


     let a = new Date(date)
        a.setHours(hour)

      let ses = useSelector((state: RootState) => getSessionByDate(state, a));


    console.log(ses)


      const handleDragStart = (e: React.DragEvent) => {
          const dragData = {
                session,
                originalDate: date,
                originalHour: hour
          };
          e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
      };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const dragData = JSON.parse(e.dataTransfer.getData('text/plain')) as {session: Session, originalDate: Date, originalHour: number};
      const droppedEvent = dragData.session;
      const originalDateObject = new Date(dragData.originalDate);
      const originalDate = `${originalDateObject.getDate()}.${originalDateObject.getMonth() + 1}.${originalDateObject.getFullYear()}`;

      const originalHour = dragData.originalHour;
      const originalDaySessions = sessions[originalDate];
      const updatedOriginalDaySessions = originalDaySessions.filter((session: Session) => parseInt(session.time.split(' ')[0]) !== originalHour);

      // Add the dropped event to the target date and hour
      const targetDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      const targetDaySessions = sessions[targetDate] || [];
      const targetEvent = getSession(date, hour);

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


    const [lastTap, setLastTap] = useState(0);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      const currentTime = new Date().getTime();
      const diffTime = currentTime - lastTap;

      if (diffTime < 1000 && diffTime > 0) {
        // The current tap happened within 1 second of the last tap, schedule the window to open after 1 second
        setTimeout(() => {
          setIsAddSessionWindowOpen({'hour': hour,'date': date});
        }, 1000);
      }

      setLastTap(currentTime);
    };


    return (
<div
    key={hour}
    className='Hour border w-12 h-8 text-xs flex justify-center items-center relative' // Increase height to h-12
    draggable={session !== null}
    onDragStart={handleDragStart}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onMouseDown={handleMouseDown} // Add this line
    // onMouseUp={handleMouseUp} // Add this line
    onTouchStart={handleMouseDown} // Add this line
    // onTouchEnd={handleMouseUp} // Add this line
>

            {session &&
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'row', // Change to row
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%', // Add width

              }}
              >
                <FaDollarSign style={{
                  color: session.paid ? 'green' : 'red'
                }}/>
                <FaVideo style={{
                  color: session.online ? 'blue' : 'gray'
                }}/>
                <FaRetweet style={{
                  color: session.repeatable ? 'orange' : 'gray'
                }}/>
              </div>
        }
        <p className="mt-2">{session === null ? "" : `${session.student} `}</p>
        </div>
    );
};


export default Hour