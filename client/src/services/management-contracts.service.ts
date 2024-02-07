import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { House } from '@models/House.ts';
import { environments } from '@environments/environments.ts';

export const managementContractsApi = createApi({
  reducerPath: 'managementContractsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['ManagementContracts'],
  endpoints: (build) => ({
    getManagementContracts: build.query<House[], void>({
      query: () => 'management-contracts',
      providesTags: () => ['ManagementContracts'],
    }),
    getManagementContract: build.query<House, string | undefined>({
      query: (id) => `management-contracts/${id}`,
      transformResponse: (data: House[]) => {
        const [house] = data;
        return house;
      },
      providesTags: () => [{ type: 'ManagementContracts' }],
    }),
  }),
});

export const { useGetManagementContractQuery, useGetManagementContractsQuery } = managementContractsApi;
