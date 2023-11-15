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
import {selectAllStudents} from "../../../store/studentSlice";

import {StudentInterface} from "../../../store/interface";

interface SessionWindowParams {
  hour: number;
  date: Date;
}
interface Props  {
  handleClosePopup: () => void;
  isAddSessionWindowOpen:SessionWindowParams;
  setIsAddSessionWindowOpen:React.Dispatch<React.SetStateAction<SessionWindowParams | null>>
  students : string[]
  specialists : string[]
}
const AddSessionWindow: React.FC<Props>  = ({
                                                handleClosePopup,
                                                isAddSessionWindowOpen,
                                                setIsAddSessionWindowOpen,
                                                // students,
                                                specialists
}) => {

    const dispatch = useDispatch();


    const students = useSelector((state: RootState) => selectAllStudents(state));

    const handleInnerDivClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the click event from propagating to the win_wrap div
    };

    const [selectedStudent, setSelectedStudent] = useState<StudentInterface>(students[0]);

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







    const existingSession  = useSelector((state: RootState) => {
        // console.log(state)
        return getSessionByDate(state, isAddSessionWindowOpen.date)
    })

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
        <div className="
        win_wrap
        fixed
        w-full
        h-full
        top-0
        left-0
        "
             style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onClick={handleClosePopup}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-4 bg-white" onClick={handleInnerDivClick}>
              <FaTimes className="cursor-pointer absolute top-0 right-0 m-1" onClick={handleClosePopup} /> {/* Cross icon */}
               <select className="w-full mt-4" value={selectedStudent.first_name} onChange={handleStudentChange}> {/* Student dropdown */}
                  {students.map((student, index) => (
                    <option key={index} value={student.id}>{student.first_name}</option>
                  ))}
                </select>
              <select className="w-full mt-4"> {/* Teacher dropdown */}
                   {specialists.map((specialist, index) => (
                    <option key={index} value={specialist}>{specialist}</option>
                  ))}
              </select>
              <div className="mt-4"> {/* Lesson type radio buttons */}
                <input type="radio" id="face-to-face" name="lesson-type" value="face-to-face" defaultChecked />
                <label htmlFor="face-to-face">Очно</label><br />
                <input type="radio" id="online" name="lesson-type" value="online" />
                <label htmlFor="online">Онлайн</label>
              </div>
              <div className="mt-4"> {/* Repetition radio buttons */}
                <input type="radio" id="repeating" name="repetition" value="repeating" defaultChecked />
                <label htmlFor="repeating">Repeating</label><br />
                <input type="radio" id="one-time" name="repetition" value="one-time" />
                <label htmlFor="one-time">One-time</label>
              </div>
              <textarea className="w-full mt-4" placeholder="Comments"></textarea> {/* Comments text area */}
             <div className="flex justify-between mt-4"> {/* Container for the buttons */}
  <button className="w-1/2 mr-2" onClick={()=>save()}> {/* Save button */}
    <FaSave /> {/* Save icon */}
  </button>
  <button className="w-1/2 ml-2" onClick={()=>handleDelete}> {/* Delete button */}
    <FaTrash /> {/* Delete icon */}
  </button>
</div>
               </div>
          </div>
    );
};

export default AddSessionWindow