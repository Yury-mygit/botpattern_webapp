import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {SessionInterface} from "./sessionSlice";
import {ServiceType} from "../interface";



// Define a service using a base URL and expected endpoints
export const sessionAPI = createApi({
  reducerPath: 'sessionAPI',
  tagTypes:['sessions'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3002' }),
  endpoints: (builder) => ({
    getSessionById: builder.query<SessionInterface, string>({
      query: (id) => `sessions/${id}`,
      providesTags: ['sessions'],
    }),
    getAllSessions: builder.query<SessionInterface, void>({

      query: () => `session`,
      providesTags: ['sessions'],
    }),
    updateSessions: builder.mutation<SessionInterface, Partial<SessionInterface>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ ...patch }) => ({
        url: `session`,
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
    deleteSession: builder.mutation<SessionInterface, Partial<SessionInterface>>({
      query: (id) => ({
        url: `sessions/${id}`,
        method: 'DELETE',
      }),
       invalidatesTags: ['sessions'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllSessionsQuery,
  useUpdateSessionsMutation,
  useCreateSessionMutation,
  useGetSessionByIdQuery,
  useDeleteSessionMutation
} = sessionAPI