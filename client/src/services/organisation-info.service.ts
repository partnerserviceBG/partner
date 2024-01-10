import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { License } from '@models/License.ts';
import { OperatingMode } from '@models/OperatingMode.ts';
import { OrganisationInfo } from '@models/OrganisationInfo.ts';

export const organisationInfoApi = createApi({
  reducerPath: 'organisationInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['organisationInfo'],
  endpoints: (build) => ({
    getOrganisationInfo: build.query<
      { info: OrganisationInfo[]; license: License[]; operatingMode: OperatingMode[] },
      void
    >({
      query: () => 'organisation-info',
      providesTags: () => ['organisationInfo'],
    }),
  }),
});

export const { useGetOrganisationInfoQuery } = organisationInfoApi;
