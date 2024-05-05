import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { ManagementContracts } from '@models/Rias-models/Managment-contracts/ManagementContracts.ts';

export const managementContractsApi = createApi({
  reducerPath: 'managementContractsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['ManagementContracts'],
  endpoints: (build) => ({
    getManagementContracts: build.query<ManagementContracts[], void>({
      query: () => 'management-contracts',
      providesTags: () => ['ManagementContracts'],
    }),
    getManagementContract: build.query<ManagementContracts, string | undefined>({
      query: (id) => `management-contracts/${id}`,
      transformResponse: (data: ManagementContracts[]) => {
        const [ contrat ] = data;
        return contrat;
      },
      providesTags: () => [{ type: 'ManagementContracts' }],
    }),
  }),
});

export const { useGetManagementContractQuery, useGetManagementContractsQuery } = managementContractsApi;
