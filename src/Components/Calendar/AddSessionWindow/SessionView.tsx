import React from 'react';
import { FaTimes, FaSave, FaTrash } from 'react-icons/fa';
import SmartSelect from "./SmartSelect";

interface SessionViewProps {
  targetDate: Date;
  selectedStudent: any; // replace with your type
  handleStudentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  students: any[]; // replace with your type
  specialists: any[]; // replace with your type
  session: any; // replace with your type
  save: () => void;
  handleDelete: () => void;
  handleClosePopup: (e: React.MouseEvent) => void;
  handleInnerDivClick: (e: React.MouseEvent) => void;
}

const SessionView: React.FC<SessionViewProps> = ({
  targetDate,
  selectedStudent,
  handleStudentChange,
  students,
  specialists,
  session,
  save,
  handleDelete,
  handleClosePopup,
  handleInnerDivClick,
}) => (
      <div className="absolute h-1/2 w-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 bg-white" onClick={handleInnerDivClick}>
        <FaTimes className="cursor-pointer absolute top-0 right-0 m-1" onClick={handleClosePopup} /> {/* Cross icon */}
        <div className="border-b-4 border-black">
          <h3>
            Занятие {targetDate.toLocaleString('ru-RU', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </h3>
        </div>
        <div className="flex flex-row space-x-4 justify-between mb-4">
          <SmartSelect
            options={students}
            value={selectedStudent.first_name}
            label="Ученик"
            onChange={()=>console.log('sdfg')}
            onTextClick={()=>console.log('sdfg')}
          />
          <SmartSelect
            options={specialists}
            value={'selectedSpecialist'}
            label="Учитель"
            onChange={()=>console.log('sdfg')}
          />
        </div>
        <div className="flex flex-row">
          <div className="mr-4"> {/* Lesson type radio buttons */}
            <input className="mr-2" type="radio" id="face-to-face" name="lesson-type" value="face-to-face" defaultChecked />
            <label htmlFor="face-to-face">Очно</label><br />
            <input className="mr-2" type="radio" id="online" name="lesson-type" value="online" />
            <label htmlFor="online">Онлайн</label>
          </div>
          <div className="mr-4"> {/* Repetition radio buttons */}
            <input className="mr-2" type="radio" id="repeating" name="repetition" value="repeating" defaultChecked />
            <label htmlFor="repeating">Repeating</label><br />
            <input className="mr-2" type="radio" id="one-time" name="repetition" value="one-time" />
            <label htmlFor="one-time">One-time</label>
          </div>
        </div>
        <div>
          {session ? session.status : ''}
        </div>
        <textarea className="w-full mt-4" placeholder="Comments"></textarea> {/* Comments text area */}
        <div className="flex justify-between mt-4"> {/* Container for the buttons */}
          <button className="w-1/2 mr-2" onClick={save}> {/* Save button */}
            <FaSave /> {/* Save icon */}
          </button>
          <button className="w-1/2 ml-2" onClick={handleDelete}> {/* Delete button */}
            <FaTrash /> {/* Delete icon */}
          </button>
        </div>
      </div>
);

export default SessionView;
