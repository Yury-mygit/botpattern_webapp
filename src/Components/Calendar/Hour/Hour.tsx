// @flow
import * as React from 'react';
import {Session, Sessions} from "../Interfases";
import {FaDollarSign, FaRetweet, FaVideo} from "react-icons/fa";


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


    let pressTimer: NodeJS.Timeout;

    const handleMouseDown = () => {
      pressTimer = setTimeout(() => {

        // if (session === null) {
        //   setIsAddSessionWindowOpen({'hour': hour,'date': date});
        // }
        // else setEditedSessin(session)
          setIsAddSessionWindowOpen({'hour': hour,'date': date});
      }, 1000); // Trigger the action if the mouse is pressed for more than 2 seconds
    };

    const handleMouseUp = () => {
      clearTimeout(pressTimer); // Clear the timer when the mouse is released
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
            onMouseUp={handleMouseUp} // Add this line
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