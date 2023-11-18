import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store' // import your store


import {useSelector} from "react-redux";

export interface Employee {
  id: number;
  status: string;
  position:string;
  profession?:string;
  first_name:string;
  last_name:string;
  contact_email?:string;
  contact_telephone?:string;
  telegram_id?:string;
  online?:boolean;
  offline?:boolean;
}


const initialState: Employee[] =
   [
    {
        'id': 1001,
        'status': 'string',
        'position':'Speech_therapist',
        'profession':'Speech_therapist',
        'first_name':'Ксюша',
        'last_name':'Семичаснова',
        'contact_email':'mail@mail.ru',
        'contact_telephone':'+7 777 777 77 77',
        'telegram_id':"35436765765",
        'online':true,
        'offline':true,
    },
    {
      'id': 1002,
      'status': 'string',
      'position':'Speech_therapist',
      'profession':'Speech_therapist',
      'first_name':'Шмургла',
      'last_name':'будаьа',
      'contact_email':'mail@mail.ru',
      'contact_telephone':'+7 777 777 77 77',
      'telegram_id':"35413165765",
      'online':true,
      'offline':true,
    },
    {
      'id': 1003,
      'status': 'string',
      'position':'Speech_therapist',
      'profession':'Speech_therapist',
      'first_name':'Глаша',
      'last_name':'Чистикова',
      'contact_email':'mail@mail.ru',
      'contact_telephone':'+7 777 777 77 77',
      'telegram_id':"35421365765",
      'online':true,
      'offline':true,
    },
  ]


const employeesListSlice = createSlice({
  name: 'employeesList',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.push(action.payload);
    },

    deleteEmployee: (state, action: PayloadAction<number>) => {
      state = state.filter(employee => employee.id !== action.payload);
    },

    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.findIndex(employee => employee.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },


  },
})

export const { addEmployee, deleteEmployee, updateEmployee } = employeesListSlice.actions

export default employeesListSlice.reducer




// Selectors
export const selectAllEmployees = (state: RootState) => state.employeesList

export const selectEmployeeById = createSelector(
  (state: RootState, id: number) => ({ employeesList: selectAllEmployees(state), id }),
  ({ employeesList, id }) => employeesList.find(employee => employee.id === id)
)