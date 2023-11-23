// @flow 
import * as React from 'react';
import { useState } from 'react';
import { useGetStudentByidQuery, useGetAllStudentsQuery } from "../store/students/QueryStydents";
import Line from './Line'
import {StudentInterface} from "../store/interface";

type Props = {

};

export const StudentsView = (props: Props) => {
  const [id, setId] = useState('');
  const [allStudentsData, setAllStudentsData] = useState<string | null>(null);
  const [shouldFetchAllStudents, setShouldFetchAllStudents] = useState(true);
  const {data: allStudentsDataFromQuery,} = useGetAllStudentsQuery(undefined, {skip: !shouldFetchAllStudents});

  const HandlerAll = () => {
    setShouldFetchAllStudents(true);
  }

  React.useEffect(() => {
    if (allStudentsDataFromQuery) {
      setAllStudentsData(JSON.stringify(allStudentsDataFromQuery));
    }
  }, [allStudentsDataFromQuery]);

  if (allStudentsDataFromQuery == undefined) return <div> loading </div>

  // console.log(allStudentsDataFromQuery.map(item => item.first_name))

interface extended extends StudentInterface {
  session_available: any; // replace 'any' with the actual type of 'session_available'
}

  return (
    <div>
      <div>

        <div className="flex flex-row justify-center mb-5">

          <div className="flex flex-row justify-center w-2/4 border-2">Name</div>
          <div className="flex flex-row justify-center w-1/4 border-2">Status</div>
          <div className="flex flex-row justify-center w-1/4 border-2">Sessions</div>

        </div>
        <div>
            {allStudentsDataFromQuery.map((item): JSX.Element => (
               <Line key={item.id} item={item as extended}></Line>
            ))}
        </div>

      </div>
    </div>
  );
}
