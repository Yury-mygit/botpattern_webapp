import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {StudentInterface} from '../interface'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes:['Students'],
  endpoints: (builder) => ({
    getStudentByid: builder.query<StudentInterface, string>({
      query: (id) => `students/${id}`,
    }),
    getAllStudents: builder.query<StudentInterface[], void>({
      query: () => `students`,
    }),

    addStudent: builder.mutation<StudentInterface, Partial<StudentInterface>>({
      query: (newStudent) => ({
        url: 'students',
        method: 'POST',
        body: newStudent,
      }),
    }),
    deleteStudent: builder.mutation<{ success: boolean, id: string }, string>({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
    }),
    updateStudent: builder.mutation<StudentInterface, { id: string, changes: Partial<StudentInterface> }>({
      query: ({ id, changes }) => ({
        url: `students/${id}`,
        method: 'PATCH',
        body: changes,
      }),
    }),
  }),
})


export const { useGetStudentByidQuery, useGetAllStudentsQuery, useAddStudentMutation, useDeleteStudentMutation, useUpdateStudentMutation } = studentApi
