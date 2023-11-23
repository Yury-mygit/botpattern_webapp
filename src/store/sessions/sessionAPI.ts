import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {SessionInterface} from "./sessionSlice";

// Define a service using a base URL and expected endpoints
export const sessionAPI = createApi({
  reducerPath: 'sessionAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
    getAllSessions: builder.query<SessionInterface, void>({
      query: () => `sessions`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSessionsQuery } = sessionAPI