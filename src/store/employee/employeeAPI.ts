import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {EmployeeInterface} from '../interface'

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  tagTypes:['Employee'],
  endpoints: (builder) => ({
    getEmployeeByid: builder.query<EmployeeInterface, string>({
      query: (id) => `employee/${id}`,
    }),
    getAllEmployees: builder.query<EmployeeInterface[], void>({
      query: () => `employees`,
    }),

    addEmployee: builder.mutation<EmployeeInterface, Partial<EmployeeInterface>>({
      query: (newStudent) => ({
        url: 'employee',
        method: 'POST',
        body: newStudent,
      }),
    }),
    deleteEmployee: builder.mutation<{ success: boolean, id: string }, string>({
      query: (id) => ({
        url: `employee/${id}`,
        method: 'DELETE',
      }),
    }),
    updateEmployee: builder.mutation<EmployeeInterface, { id: string, changes: Partial<EmployeeInterface> }>({
      query: ({ id, changes }) => ({
        url: `employee/${id}`,
        method: 'PATCH',
        body: changes,
      }),
    }),
  }),
})


export const {
  useGetEmployeeByidQuery,
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation } = employeeApi

