// @flow
import * as React from 'react';
import {FaTimes} from "react-icons/fa";
import {Sessions} from "../Interfases";
import {useState} from "react";
import {Session} from "../Interfases";
import { FaSave, FaTrash } from 'react-icons/fa';

interface SessionWindowParams {
  hour: number;
  date: Date;
}
interface Props  {
  handleClosePopup: () => void;
  addSession: (date: Date, time: string, student: string, specialist: string, online: boolean, paid: boolean, confirmed: boolean, sessionId: number, studentId: number, specialistId: number, repeatable: boolean) => void;
  updateSession:(id: number, newSessionData: Partial<Session>)=>void;
  getSession:(date: Date, hour: number)=> Session | null;
  isAddSessionWindowOpen:SessionWindowParams;
  setIsAddSessionWindowOpen:React.Dispatch<React.SetStateAction<SessionWindowParams | null>>
  students : string[]
  specialists : string[]
}
const AddSessionWindow: React.FC<Props>  = ({
                                                handleClosePopup,
                                                addSession,
    getSession,
    updateSession,
                                                isAddSessionWindowOpen,
                                                setIsAddSessionWindowOpen,
                                                students,
    specialists
}) => {

    const handleInnerDivClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the click event from propagating to the win_wrap div
    };

    const [selectedStudent, setSelectedStudent] = useState<string>(students[0]);

    const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedStudent(event.target.value);
    };


const handleDelete = () => {
    console.log('sdsdsds')
}


const save = () => {
  const existingSession = getSession(isAddSessionWindowOpen.date, isAddSessionWindowOpen.hour);

  if (existingSession === null) {
    // No existing session, create a new one
    addSession(
      isAddSessionWindowOpen.date,
      `${isAddSessionWindowOpen.hour} 00`,
      selectedStudent,
      "New Specialist",
      true,
      true,
      true,
      2,
      2,
      2,
      true
    );
  } else {
    // Existing session, update it
    updateSession(existingSession.id, {
      time: `${isAddSessionWindowOpen.hour} 00`,
      student: selectedStudent,
      specialist: "New Specialist",
      online: true,
      paid: true,
      confirmed: true,
      session_id: 2,
      student_id: 2,
      specialist_id: 2,
      repeatable: true,
    });
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
               <select className="w-full mt-4" value={selectedStudent} onChange={handleStudentChange}> {/* Student dropdown */}
                  {students.map((student, index) => (
                    <option key={index} value={student}>{student}</option>
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