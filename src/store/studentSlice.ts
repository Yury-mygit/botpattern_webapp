import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from './store' // import your store
import {StudentInterface} from './interface'
import {useSelector} from "react-redux";

interface StudentsState {
  students: StudentInterface[];
}

const initialState: StudentsState = {
  students: [
    {
        'id': 1,
        'first_name': 'Дуся',
        'last_name': 'Семичаснова',
        'parentsName': 'Ксюша',
        'age':9,
        'status':'activ',
        'session_transfer_rate':0.01,
        'percentage_of_absences':0.01,
        'contact_email':'Dusa@yandex.ru',
        'contact_telephone':'+79123452322',
        'allow_telegram_notification':false,
        'telegram_id':4353465535,
        'issue':"Не произносит звук Р",
        'date_of_initial_diagnosis':'1970-01-01T00:00:00.000Z',
        'address':"Москва кирпичная д 35 кв 13",
        'found_us_through':"Совет знакомых",
        'online': false,
        'notes':'string',
    },
    {
        'id': 2,
        'first_name': 'Суша',
        'last_name': 'Семичаснова',
        'parentsName': 'Ксюша',
        'age':9,
        'status':'activ',
        'session_transfer_rate':0.01,
        'percentage_of_absences':0.01,
        'contact_email':'Dusa@yandex.ru',
        'contact_telephone':'+79123452322',
        'allow_telegram_notification':false,
        'telegram_id':4353425535,
        'issue':"Не произносит звук Р",
        'date_of_initial_diagnosis':'1970-01-01T00:00:00.000Z',
        'address':"Москва кирпичная д 35 кв 13",
        'found_us_through':"Совет знакомых",
        'online': false,
        'notes':'string',
    },
    {
        'id': 3,
        'first_name': 'Саша',
        'last_name': 'Семичаснова',
        'parentsName': 'Ксюша',
        'age':9,
        'status':'activ',
        'session_transfer_rate':0.01,
        'percentage_of_absences':0.01,
        'contact_email':'Dusa@yandex.ru',
        'contact_telephone':'+79123452322',
        'allow_telegram_notification':false,
        'telegram_id':4353425535,
        'issue':"Не произносит звук Р",
        'date_of_initial_diagnosis':'1970-01-01T00:00:00.000Z',
        'address':"Москва кирпичная д 35 кв 13",
        'found_us_through':"Совет знакомых",
        'online': false,
        'notes':'string',
    },
  ],
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<StudentInterface>) => {
      state.students.push(action.payload);
    },

    deleteStudent: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },



    updateStudent: (state, action: PayloadAction<StudentInterface>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },


  },
})

export const { addStudent, deleteStudent, updateStudent } = studentsSlice.actions

export default studentsSlice.reducer

// Selectors
export const selectAllStudents = (state: RootState) => state.students.students

export const selectStudentById = (id: number) => createSelector(
  selectAllStudents,
  (students: StudentInterface[]) => students.find(student => student.id === id)
)
