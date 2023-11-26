// @flow
import * as React from 'react';
import {useCreateSessionMutation, useGetSessionByIdQuery, useUpdateSessionsMutation} from "../store/sessions/sessionAPI";
import {SessionInterface, SessionInterfaceCrete} from "../store/sessions/sessionSlice";
import {ServiceType} from "../store/interface";

type Props = {

};

let dataforsend : SessionInterface = {
    "startDateTime": "2023-11-12 13:00:00",
    "duration": 40,
    "week_first_day": "2023-11-06",
    "online": false,
    "paid": true,
    "confirmed": false,
    "student_id": 228,
    "employee_id": 93,
    "repeatable": false,
    "notes": "bla bla bla sdjhgfdfbhjm,mhngjkbfvdfvgbcnhvmjbdsda",
    "office_id": 122,
    "performed": true,
    "serviceType": 0,
    "status": "Status.INACTIVE",
    "id": 1612
}

let dataforcreate : SessionInterfaceCrete = {
    "startDateTime": "2023-11-12 13:00:00",
    "duration": 40,
    "week_first_day": "2023-11-06",
    "online": false,
    "paid": true,
    "confirmed": false,
    "student_id": 229,
    "employee_id": 95,
    "repeatable": false,
    "notes": "bla bla bla sdjhgfdfbhjm,mhngjkbfvdfvgbcnhvmjbdsda",
    "office_id": 126,
    "performed": true,
    "serviceType": 0,
    "status": "Status.INACTIVE",
}

function Employess(props: Props) {

  const { data: session, isLoading, isError, error } = useGetSessionByIdQuery('1653');


  const [updateSesion, { isLoading: isUpdating }] = useUpdateSessionsMutation()
  const [createSession, {data, isLoading: isCreating }] = useCreateSessionMutation()

  const handler = () => {
    updateSesion(dataforsend)
  }
  const create = () => {
    createSession(dataforcreate)
  }

  const show = () => {
    console.log(data, session)
  }

  return (
    <div>
        <h1>{session? session.id:""}</h1>
        <button onClick={()=>handler()} className="bg-cyan-400" >update session</button>
        <button onClick={()=>create()} className="bg-cyan-400 m-5" >create</button>
        <button onClick={()=>show()} className="bg-cyan-400 m-5" >show</button>
    </div>
  );
};

export default Employess