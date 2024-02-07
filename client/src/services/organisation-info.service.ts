import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environments } from '@environments/environments.ts';
import { License } from '@models/License.ts';
import { ScheduleCompany } from '@models/ScheduleCompany.ts';
import { OrganisationInfo } from '@models/OrganisationInfo.ts';

export const organisationInfoApi = createApi({
  reducerPath: 'organisationInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: environments.baseUrl }),
  tagTypes: ['organisationInfo'],
  endpoints: (build) => ({
    getAllInfo: build.query<{ info: OrganisationInfo[]; license: License[]; schedule: ScheduleCompany[] }, void>({
      query: () => 'organisation-info',
      providesTags: () => ['organisationInfo'],
    }),
    getLicense: build.query<License[], void>({
      query: () => 'organisation-info/license',
      providesTags: () => ['organisationInfo'],
    }),
    getInfo: build.query<OrganisationInfo[], void>({
      query: () => 'organisation-info/info',
      providesTags: () => ['organisationInfo'],
    }),
    getScheduleCompany: build.query<ScheduleCompany[], void>({
      query: () => 'organisation-info/schedule',
      providesTags: () => ['organisationInfo'],
    }),
  }),
});

export const { useGetAllInfoQuery, useGetLicenseQuery, useGetInfoQuery, useGetScheduleCompanyQuery } =
  organisationInfoApi;
