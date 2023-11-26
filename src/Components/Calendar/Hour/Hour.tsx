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
import {useGetStudentByidQuery} from "../../../store/students/studentAPI";
import {StudentInterface} from '../../../store/interface'
import {useUpdateSessionsMutation} from "../../../store/sessions/sessionAPI";
interface SessionWindowParams {
  hour: number;
  date: Date;
}

interface Props  {
  hour: number;
  date: Date;
  setIsAddSessionWindowOpen: (params: SessionWindowParams) => void; // Use the SessionWindowParams type here
  session?: SessionInterface
  styde?:StudentInterface
  checkSession: (date: Date) => SessionInterface | undefined; // Add this line
}

export const Hour: React.FC<Props> = ({
                          hour,
                          date,
                          setIsAddSessionWindowOpen,
                          session,
                          styde,
                           checkSession
}) => {

    let dragging = false;

    let dateAdapter = new Date(date)
    dateAdapter.setHours(hour)

    const dispatch = useDispatch();


    const handleDragStart = (e: React.DragEvent) => {
      console.log('handleDragStart')
      dragging = true;
      const dragData = {
        session: session,
        originalDate: date,
        originalHour: hour
      };
      e.dataTransfer.setData('text/plain', JSON.stringify(dragData));

    };


     const [updateSesion, { isLoading: isUpdating }] = useUpdateSessionsMutation()

     let existingSession = useSelector((state: RootState) => {
            return getSessionByDate(state, dateAdapter)
     })

    // console.log(existingSession, checkSession(dateAdapter))

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const dragData = JSON.parse(e.dataTransfer.getData('text/plain')) as {session: SessionInterface, originalDate: Date, originalHour: number};


      // Create a new date object for the date and hour where the session was dropped
      const newDate = new Date(date);
      newDate.setHours(hour);


      if (session) {
           updateSesion({ ...dragData.session, startDateTime: session.startDateTime, serviceType: 0 } )
           updateSesion({ ...session, startDateTime: dragData.session.startDateTime, serviceType: 0 } )
      } else {
        updateSesion({ ...dragData.session, startDateTime: newDate.toISOString(), serviceType: 0 } )
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
    draggable={session !== undefined}
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
        <p className="mt-2">{session && styde ? `${styde.first_name} ` : ""}</p>
        </div>
    );
};


export default Hour