import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store' // import your store
import {StudentInterface} from '../interface'
import {EmployeeInterface, EmployeesListInterface} from '../interface'
import {useSelector} from "react-redux";


const initialState: EmployeesListInterface = {
  employeesList: [
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
  ],
}

const employeesListSlice = createSlice({
  name: 'employeesList',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<EmployeeInterface>) => {
      state.employeesList.push(action.payload);
    },

    deleteStudent: (state, action: PayloadAction<number>) => {
      state.employeesList = state.employeesList.filter(student => student.id !== action.payload);
    },



    updateStudent: (state, action: PayloadAction<EmployeeInterface>) => {
      const index = state.employeesList.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.employeesList[index] = action.payload;
      }
    },


  },
})

export const { addStudent, deleteStudent, updateStudent } = employeesListSlice.actions

export default employeesListSlice.reducer

// Selectors
export const selectAllEmployees = (state: RootState) => state.employeesList.employeesList

export const selectEmployeeById = createSelector(
  (state: RootState, id: number) => ({ employeesList: selectAllEmployees(state), id }),
  ({ employeesList, id }) => employeesList.find(employee => employee.id === id)
)