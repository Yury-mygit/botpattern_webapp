// @flow
import * as React from 'react';
import {FaTimes} from "react-icons/fa";
import {Sessions} from "../Interfases";
import {useState} from "react";
import {Session} from "../Interfases";
import { FaSave, FaTrash } from 'react-icons/fa';
import {addSession, updateSession, deleteSession} from "../../../store/sessionSlice";
import {getSessionByDate} from "../../../store/sessionSelectors";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../../store/store";
import {selectAllStudents, selectStudentById} from "../../../store/studentSlice";

import {StudentInterface} from "../../../store/interface";
import SessionView from "./SessionView";

interface SessionWindowParams {
  hour: number;
  date: Date;
}
interface Props  {
  handleClosePopup: () => void;
  isAddSessionWindowOpen:SessionWindowParams;
  setIsAddSessionWindowOpen:React.Dispatch<React.SetStateAction<SessionWindowParams | null>>
  specialists? : string[]
}
const AddSessionWindow: React.FC<Props>  = ({
                                                handleClosePopup,
                                                isAddSessionWindowOpen,
                                                setIsAddSessionWindowOpen,
                                                specialists=['Ксения, Валентина']
}) => {

  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentInterface>(students[0]);

  const [windowState, setWindowState] = useState('session');

  const existingSession  = useSelector((state: RootState) => getSessionByDate(state, isAddSessionWindowOpen.date))

  const student = useSelector(selectStudentById(selectedStudent.id));
  // console.log(studentsssss)

  let targetDate :Date = isAddSessionWindowOpen.date
    targetDate.setHours(isAddSessionWindowOpen.hour)

  let session = useSelector((state: RootState) => {
    return getSessionByDate(state, targetDate)
  })

  const handleInnerDivClick = (e: React.MouseEvent):void => {
      e.stopPropagation(); // Prevent the click event from propagating to the win_wrap div
    };


  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedStudent(event.target.value);
    const selectedStudent = students.find(st => st.id.toString() == event.target.value);
    if (selectedStudent) {
      setSelectedStudent(selectedStudent);
    } else {
      // Handle the case where no student was found
    }
  };


  const handleDelete = () => {
      console.log('sdsdsds')
  }


    const makeNewSession = () =>{
      let targetDate :Date = isAddSessionWindowOpen.date
      targetDate.setHours(isAddSessionWindowOpen.hour)

      dispatch(addSession( {
          'id': 1001,
          'startDateTime': targetDate.toISOString(),
          'duration':30,
          'week_first_day': new Date(2023, 10, 13,0,0,0).toString(),
          "online": false,
          "paid": true,
          "confirmed": true,
          "student_id": selectedStudent.id,
          "specialist_id": 1,
          "repeatable": true,
          "notes": '',
          "office_id": 1,
          "performed": true,
          "serviceType":0,
          "status":"done"
      }));
    }








   const save = () => {
  if (existingSession === undefined) {
    makeNewSession()
  } else {
    // Update existing session
    dispatch(updateSession({id: existingSession.id, newSessionData: existingSession}));
  }

  setIsAddSessionWindowOpen(null);
};


return (
  <div className="win_wrap fixed w-full h-full top-0 left-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onClick={handleClosePopup}>
    {windowState == 'session' && (
      <SessionView
        targetDate={targetDate}
        selectedStudent={selectedStudent}
        handleStudentChange={handleStudentChange}
        students={students}
        specialists={specialists}
        session={session}
        save={save}
        handleDelete={handleDelete}
        handleClosePopup={handleClosePopup}
        handleInnerDivClick={handleInnerDivClick}
      />
    )
    }
  </div>
);

};

export default AddSessionWindow



// const YourComponent = () => {
//   const id = 1; // replace with the actual ID you want to select
//   const student = useSelector(selectStudentById(id));
