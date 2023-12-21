import { Post } from '@models/Post';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const housesApi = createApi({
  reducerPath: 'housesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Houses'],
  endpoints: (build) => ({
    getHouses: build.query<Post[], void>({
      query: () => 'houses',
      providesTags: () => ['Houses'],
    }),
    getHouse: build.query<Post, number>({
      query: (id) => `houses/${id}`,
      providesTags: () => [{ type: 'Houses'}],
    }),
  }),
});

export const { useGetHousesQuery, useGetHouseQuery } = housesApi;
