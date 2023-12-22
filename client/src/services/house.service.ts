import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { House } from '@models/House.ts';

export const housesApi = createApi({
  reducerPath: 'housesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Houses'],
  endpoints: (build) => ({
    getHouses: build.query<House[], void>({
      query: () => 'houses',
      providesTags: () => ['Houses'],
    }),
    getHouse: build.query<House, string | undefined>({
      query: (id) => `houses/${id}`,
      transformResponse: (data: House[]) => {
        const [house] = data;
        return house;
      },
      providesTags: () => [{ type: 'Houses' }],
    }),
  }),
});

export const { useGetHousesQuery, useGetHouseQuery } = housesApi;
