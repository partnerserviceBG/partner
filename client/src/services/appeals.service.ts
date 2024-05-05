import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { Appeals } from '@models/Rias-models/Appeals/Appeals.ts';

export const appealsApi = createApi({
  reducerPath: 'appealsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['appeals'],
  endpoints: (build) => ({
    getAppeals: build.query<Appeals[], void>({
      query: () => 'appeals',
      providesTags: () => ['appeals'],
    }),
    getAppeal: build.query<Appeals, string | undefined>({
      query: (id) => `appeals/${id}`,
      transformResponse: (data: Appeals[]) => {
        const [appeals] = data;
        return appeals;
      },
      providesTags: () => [{ type: 'appeals' }],
    }),
  }),
});

export const { useGetAppealQuery, useGetAppealsQuery  } = appealsApi;
