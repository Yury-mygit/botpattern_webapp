// @flow
import * as React from 'react';
import {Session, Sessions} from "../Interfases";
import {FaDollarSign, FaRetweet, FaVideo} from "react-icons/fa";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";
import {addSession,updateSession,deleteSession} from "../../../store/sessions/sessionSlice";
import {getSessionByDate} from '../../../store/sessions/sessionSelectors'
import {SessionsListInterface, SessionInterface} from "../../../store/interface";
import {RootState} from "../../../store/store";
import {selectStudentById} from "../../../store/students/studentSlice";
import {set} from "../../../store/HourSlice";
import {HourState} from '../../../store/HourSlice'
interface SessionWindowParams {
  hour: number;
  date: Date;
}

interface Props  {
  hour: number;
  date: Date;
  setIsAddSessionWindowOpen: (params: SessionWindowParams) => void; // Use the SessionWindowParams type here
  session?: SessionInterface
}

export const Hour: React.FC<Props> = ({
                          hour,
                          date,
                          setIsAddSessionWindowOpen,
                          session
      }) => {
    console.log(session)
    // const hourDate = use
    let dragging = false;


    let dateAdapter = new Date(date)
    dateAdapter.setHours(hour)
    const dispatch = useDispatch();

    let session1 = useSelector((state: RootState) => {
        return getSessionByDate(state, dateAdapter)
    })

    const studentId = session1 !== undefined ? session1.student_id : -1;
    const selectCurrentStudent = selectStudentById(studentId);
    const student = useSelector(selectCurrentStudent);



    const handleDragStart = (e: React.DragEvent) => {
      console.log('handleDragStart')
      dragging = true;
      const dragData = {
        session: session1,
        originalDate: date,
        originalHour: hour
      };
      e.dataTransfer.setData('text/plain', JSON.stringify(dragData));

    };




     let existingSession = useSelector((state: RootState) => {
            return getSessionByDate(state, dateAdapter)
     })

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const dragData = JSON.parse(e.dataTransfer.getData('text/plain')) as {session: SessionInterface, originalDate: Date, originalHour: number};


      // Create a new date object for the date and hour where the session was dropped
      const newDate = new Date(date);
      newDate.setHours(hour);

      // Check if there's already a session at the drop location
      // const existingSession = getSessionByDate(newDate, hour);

      if (existingSession) {
            // If there is, swap their startDateTime values
            dispatch(updateSession({ id: dragData.session.id, newSessionData: { ...dragData.session, startDateTime: existingSession.startDateTime } }));
            dispatch(updateSession({ id: existingSession.id, newSessionData: { ...existingSession, startDateTime: dragData.session.startDateTime } }));
      } else {
        // If there isn't, just update the dropped session
        dispatch(updateSession({ id: dragData.session.id, newSessionData: { ...dragData.session, startDateTime: newDate.toISOString() } }));
      }
    };


    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const [lastTap, setLastTap] = useState(0);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {

       if (dragging) {
        dragging = false;
        return;
      }


      let aaa : HourState = {
         value: hour,
         date: JSON.stringify(date)
      }



      const currentTime = new Date().getTime();
      const diffTime = currentTime - lastTap;

      if (diffTime < 1000 && diffTime > 0) {
        // The current tap happened within 1 second of the last tap, schedule the window to open after 1 second
        setTimeout(() => {
          setIsAddSessionWindowOpen({'hour': hour,'date': date});
          dispatch(set(aaa))
        }, 1000);
      }

      setLastTap(currentTime);
    };



    return (
<div
    key={hour}
    className='Hour border w-12 h-8 text-xs flex justify-center items-center relative' // Increase height to h-12
    draggable={session1 !== undefined}
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
        <p className="mt-2">{session1 && student ? `${student.first_name} ` : ""}</p>
        </div>
    );
};


export default Hour