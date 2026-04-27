import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { House } from '@models/Rias-models/House/House.ts';
import { environments } from '@environments/environments.ts';

export interface HousesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const housesApi = createApi({
  reducerPath: 'housesApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['Houses'],
  endpoints: (build) => ({
    getHouses: build.query<House[], HousesQueryParams | void>({
      query: (params) => ({
        url: 'houses',
        params: {
          ...(params?.page ? { page: params.page } : {}),
          ...(params?.limit ? { limit: params.limit } : {}),
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      transformResponse: (data: House[]) => {
        return [...data].sort((a, b) => a.full_address.localeCompare(b.full_address));
      },
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
