import * as React from 'react';
import {FaTimes} from "react-icons/fa";
import {useState} from "react";
import { FaSave, FaTrash } from 'react-icons/fa';
import {addSession, updateSession, deleteSession} from "../../../store/sessions/sessionSlice";
import {getAllSessionOnWeek, getSessionByDate} from "../../../store/sessions/sessionSelectors";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../../store/store";
import {selectAllStudents, selectStudentById} from "../../../store/students/studentSlice";
import Select from 'react-select'
import {SessionInterface} from "../../../store/sessions/sessionSlice";
import {selectAllEmployees} from './../../../store/employee/employeeSlice'


import { useGetStudentByidQuery, useGetAllStudentsQuery } from "../../../store/students/QueryStydents";
import {StudentInterface} from "../../../store/interface";

interface SessionWindowParams {
  hour: number;
  date: Date;
}
interface Props  {
  handleClosePopup: () => void;
  isAddSessionWindowOpen:SessionWindowParams;
  setIsAddSessionWindowOpen:React.Dispatch<React.SetStateAction<SessionWindowParams | null>>
}
const AddSessionWindow: React.FC<Props>  = ({
                                                handleClosePopup,
                                                isAddSessionWindowOpen,
                                                setIsAddSessionWindowOpen,
}) => {


  const date = new Date();
  const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // Adjusted for Sunday being day 0
  const firstDayDate = new Date(date.setDate(firstDayOfWeek));

  const sessions : SessionInterface[] = useSelector((state: RootState) => getAllSessionOnWeek(state, firstDayDate));


  const dispatch = useDispatch();


  // const students = useSelector(selectAllStudents);

  let students1: StudentInterface[] | undefined
  const {
    data,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery()

  // console.log(data)
   React.useEffect(() => {
    // if(!isFetching){
      // console.log(data, students)
      students1 = data

    // }
  }, [data]);

  const employees = useSelector(selectAllEmployees);
  // const sessions : SessionInterface[] = useSelector((state: RootState) => getAllSessionOnWeek(state));

  // const [selectedStudent, setSelectedStudent] = useState<StudentInterface>(students[0]);
  // const [windowState, setWindowState] = useState('session');
  const existingSession  = useSelector((state: RootState) => getSessionByDate(state, isAddSessionWindowOpen.date))

  const selectedHourState = useSelector((state: RootState) => state.hour)
console.log(selectedHourState)
let targetDate :Date = isAddSessionWindowOpen.date
    targetDate.setHours(isAddSessionWindowOpen.hour)
  let session = useSelector((state: RootState) => {
    return getSessionByDate(state, targetDate)
  })

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
 const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);

console.log(data)
 if (data==undefined) {
   return (<div>sdsdsd</div>)
 }
students1=data

  let newOptions = students1.map(item=>{
    return({
        'value': item.id,
        'label': item.first_name
      })
  })

  let newOptions2 = employees.map(item=>{
    return({
        'value': item.id,
        'label': item.first_name
      })
  })





  const handleInnerDivClick = (e: React.MouseEvent):void => {
      e.stopPropagation(); // Prevent the click event from propagating to the win_wrap div
    };


   interface Option {
    value: number;
    label: string;
  }


const handleChange = (selectedOption: Option | null) => {
  setSelectedOption(selectedOption);
  // console.log(selectedOption)
};
const handleChange2 = (selectedOption: Option | null) => {
  setSelectedOption2(selectedOption2);
  // console.log(selectedOption)
};

  const handleDelete = () => {
      console.log('sdsdsds')
  }


   const save = () => {
  if (existingSession === undefined) {
    let targetDate :Date = isAddSessionWindowOpen.date
    targetDate.setHours(isAddSessionWindowOpen.hour)


    // const studentId = students1.find(item => item.id === selectedOption.value);

    if (selectedOption !== null && students1) {
      const studentId = students1.find(item => item.id === selectedOption.value);

      dispatch(addSession( {
        'id': 1001,
        'startDateTime': targetDate.toISOString(),
        'duration':30,
        'week_first_day': new Date(2023, 10, 13,0,0,0).toString(),
        "online": false,
        "paid": true,
        "confirmed": true,
        "student_id": studentId== undefined? 0 : studentId.id,
        "employee_id": 1,
        "repeatable": true,
        "notes": '',
        "office_id": 1,
        "performed": true,
        "serviceType":0,
        "status":"done"
      }));
    }
  } else {
    // Update existing session
    dispatch(updateSession({id: existingSession.id, newSessionData: existingSession}));
  }

  setIsAddSessionWindowOpen(null);
};


return (
  <div
    className="win_wrap absolute w-full h-full top-0 left-0"
    style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
    onClick={handleClosePopup}
  >
      <div className="absolute h-1/2 w-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 bg-white"
         onClick={handleInnerDivClick}>
      <FaTimes className="cursor-pointer absolute top-0 right-0 m-1" onClick={handleClosePopup}/> {/* Cross icon */}
      <div className="border-b-4 border-black">
        <h3>
          Занятие {targetDate.toLocaleString('ru-RU', {
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
        </h3>
      </div>
      <div className="flex flex-col space-x-4 justify-between mb-4">
        <Select
          options={newOptions}
          defaultValue={newOptions[0]} // Set the first option as the default value
          onChange={handleChange}
          styles={{
            container: (provided) => ({
              ...provided,
              width: '80%'
            })
          }}
        />
         <Select
          options={newOptions2}
          defaultValue={newOptions2[0]} // Set the first option as the default value
          onChange={handleChange2}
          styles={{
            container: (provided) => ({
              ...provided,
              width: '45%',
              padding: '0px',
            })
          }}
        />
      </div>
      <div className="flex flex-row">
        <div className="mr-4"> {/* Lesson type radio buttons */}
          <input className="mr-2" type="radio" id="face-to-face" name="lesson-type" value="face-to-face"
                 defaultChecked/>
          <label htmlFor="face-to-face">Очно</label><br/>
          <input className="mr-2" type="radio" id="online" name="lesson-type" value="online"/>
          <label htmlFor="online">Онлайн</label>
        </div>
        <div className="mr-4"> {/* Repetition radio buttons */}
          <input className="mr-2" type="radio" id="repeating" name="repetition" value="repeating" defaultChecked/>
          <label htmlFor="repeating">Repeating</label><br/>
          <input className="mr-2" type="radio" id="one-time" name="repetition" value="one-time"/>
          <label htmlFor="one-time">One-time</label>
        </div>
      </div>
      <div>
        {session ? session.status : ''}
      </div>
      <textarea className="w-full mt-4" placeholder="Comments"></textarea> {/* Comments text area */}
      <div className="flex justify-between mt-4"> {/* Container for the buttons */}
        <button className="w-1/2 mr-2" onClick={save}> {/* Save button */}
          <FaSave/> {/* Save icon */}
        </button>
        <button className="w-1/2 ml-2" onClick={handleDelete}> {/* Delete button */}
          <FaTrash/> {/* Delete icon */}
        </button>
      </div>
    </div>

  </div>
);

};

export default AddSessionWindow



// const YourComponent = () => {
//   const id = 1; // replace with the actual ID you want to select
//   const student = useSelector(selectStudentById(id));
