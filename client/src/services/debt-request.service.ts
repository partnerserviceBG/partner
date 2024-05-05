import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { Nsi } from '@models/Rias-models/Nsi/Nsi.ts';

export const debtRequestApi = createApi({
  reducerPath: 'debtRequestApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['debtRequest'],
  endpoints: (build) => ({
    getDebtRequests: build.query<Nsi[], void>({
      query: () => 'debtRequest',
      providesTags: () => ['debtRequest'],
    }),
    getDebtRequest: build.query<Nsi, string | undefined>({
      query: (id) => `debtRequest/${id}`,
      transformResponse: (data: Nsi[]) => {
        const [nsi] = data;
        return nsi;
      },
      providesTags: () => [{ type: 'debtRequest' }],
    }),
  }),
});

export const { useGetDebtRequestQuery, useLazyGetDebtRequestQuery  } = debtRequestApi;
