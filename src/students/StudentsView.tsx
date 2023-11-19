// @flow 
import * as React from 'react';
import { useState } from 'react';
import { useGetStudentByidQuery, useGetAllStudentsQuery } from "../store/students/QueryStydents";

type Props = {

};

export const StudentsView = (props: Props) => {
  const [id, setId] = useState('');
  const [studentData, setStudentData] = useState('');
  const [allStudentsData, setAllStudentsData] = useState<string | null>(null);
  const [shouldFetchAllStudents, setShouldFetchAllStudents] = useState(false);

  const {
    data: studentDataById,
    error,
    isLoading
  } = useGetStudentByidQuery(id)

  const {
    data: allStudentsDataFromQuery,
  } = useGetAllStudentsQuery(undefined, {
    skip: !shouldFetchAllStudents
  });

  const Handler = () => {
    if(studentDataById){
      setStudentData(JSON.stringify(studentDataById));
    }
  }

  const HandlerAll = () => {
    setShouldFetchAllStudents(true);
  }

  React.useEffect(() => {
    if(allStudentsDataFromQuery){
      setAllStudentsData(JSON.stringify(allStudentsDataFromQuery));
    }
  }, [allStudentsDataFromQuery]);

  return (
    <div>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={()=>Handler()}>Load Student Data</button>
      <textarea value={studentData} readOnly className="border-2"/>
      <button onClick={()=>HandlerAll()}>Load All Students Data</button>
      <div>{allStudentsData}</div>
    </div>
  );
};
