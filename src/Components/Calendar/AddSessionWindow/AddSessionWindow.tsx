// @flow
import * as React from 'react';
import {FaTimes} from "react-icons/fa";

interface Props  {
  handleClosePopup: () => void;
  addSession: (date: Date, time: string, student: string, specialist: string, online: boolean, paid: boolean, confirmed: boolean, sessionId: number, studentId: number, specialistId: number, repeatable: boolean) => void;
}
const AddSessionWindow: React.FC<Props>  = ({handleClosePopup, addSession}) => {

    const handleInnerDivClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the click event from propagating to the win_wrap div
    };

    const save = () => {
        addSession(new Date('November 17, 2023'), "20 00", "New Student", "New Specialist", true, true, true, 2, 2, 2, true);

    }

    return (
        <div className="win_wrap fixed w-full h-full top-0 left-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onClick={handleClosePopup}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-4 bg-white" onClick={handleInnerDivClick}>
              <FaTimes className="cursor-pointer absolute top-0 right-0 m-1" onClick={handleClosePopup} /> {/* Cross icon */}
              <select className="w-full mt-4"> {/* Student dropdown */}
                <option>Пункт 1</option>
                <option>Пункт 2</option>
              </select>
              <select className="w-full mt-4"> {/* Teacher dropdown */}
                 <option>Пункт 1</option>
                 <option>Пункт 2</option>
              </select>
              <div className="mt-4"> {/* Lesson type radio buttons */}
                <input type="radio" id="face-to-face" name="lesson-type" value="face-to-face" defaultChecked />
                <label htmlFor="face-to-face">Face-to-face</label><br />
                <input type="radio" id="online" name="lesson-type" value="online" />
                <label htmlFor="online">Online</label>
              </div>
              <div className="mt-4"> {/* Repetition radio buttons */}
                <input type="radio" id="repeating" name="repetition" value="repeating" defaultChecked />
                <label htmlFor="repeating">Repeating</label><br />
                <input type="radio" id="one-time" name="repetition" value="one-time" />
                <label htmlFor="one-time">One-time</label>
              </div>
              <textarea className="w-full mt-4" placeholder="Comments"></textarea> {/* Comments text area */}
              <button className="w-full mt-4" onClick={()=>save()}>Save</button> {/* Save button */}
            </div>
          </div>
    );
};

export default AddSessionWindow