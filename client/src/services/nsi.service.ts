import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { Nsi } from '@models/Rias-models/Nsi/Nsi.ts';

export const nsiApi = createApi({
  reducerPath: 'nsiApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['nsi'],
  endpoints: (build) => ({
    getNsis: build.query<Nsi[], void>({
      query: () => 'nsi',
      providesTags: () => ['nsi'],
    }),
    getNsi: build.query<Nsi, string | undefined>({
      query: (id) => `nsi/${id}`,
      transformResponse: (data: Nsi[]) => {
        const [nsi] = data;
        return nsi;
      },
      providesTags: () => [{ type: 'nsi' }],
    }),
  }),
});

export const { useGetNsiQuery, useGetNsisQuery  } = nsiApi;
