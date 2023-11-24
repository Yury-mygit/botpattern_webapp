import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {SessionInterface} from "./sessionSlice";
import {ServiceType} from "../interface";


// {
//   "startDateTime": "string",
//   "duration": 0,
//   "week_first_day": "string",
//   "online": true,
//   "paid": true,
//   "confirmed": true,
//   "student_id": 0,
//   "employee_id": 0,
//   "repeatable": true,
//   "notes": "string",
//   "office_id": 0,
//   "performed": true,
//   "serviceType": "string",
//   "status": "string"
// }
//
// export interface SessionInterface {
//   id: number;
//   startDateTime: string;
//   duration: number; // in minute
//   week_first_day: string;
//   student_id: number; // ID of the Student
//   employee_id: number; // ID of the Specialist
//   office_id: number; // ID of the Office
//   serviceType: ServiceType;
//   performed: boolean;
//   paid: boolean;
//   online: boolean;
//   confirmed: boolean;
//   repeatable: boolean;
//   notes: string;
//   status: string; // Could be an enum if there's a fixed set of statuses
// }

// Define a service using a base URL and expected endpoints
export const sessionAPI = createApi({
  reducerPath: 'sessionAPI',
  tagTypes:['sessions'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({

    getAllSessions: builder.query<SessionInterface, void>({

      query: () => `sessions`,
    }),
    updatePost: builder.mutation<SessionInterface, Partial<SessionInterface>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ ...patch }) => ({
        url: `sessions`,
        method: 'PATCH',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: SessionInterface }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ['sessions'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
    createSession: builder.mutation<SessionInterface, Partial<SessionInterface>>({
      query: (patch) => ({
        url: `sessions`,
        method: 'PUT',
        body: patch,
      }),
       invalidatesTags: ['sessions'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllSessionsQuery,
  useUpdatePostMutation,
  useCreateSessionMutation
} = sessionAPI